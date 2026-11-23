import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { Resend } from 'resend';
import { prisma } from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';
import { verifyTurnstileToken } from '@/lib/turnstile';

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // 0a. Honeypot check (instant silent drop for automated bots)
    if (data.website_url || data.company_fax || data.honeypot) {
      console.warn('Spambot trapped by honeypot field');
      return NextResponse.json({ success: true, ref: 'FTL-VERIFIED' });
    }

    // 0b. Spambot Signature Filter (blocks the exact attacks seen in screenshot)
    const arrivalRaw = String(data.arrival || data['Arrival Date'] || '').trim();
    if (arrivalRaw.startsWith('1970') || (arrivalRaw.length >= 4 && parseInt(arrivalRaw.slice(0, 4), 10) < 2024)) {
      console.warn('Spambot blocked due to historical/invalid arrival date:', arrivalRaw);
      return NextResponse.json({ error: 'Please select a valid upcoming arrival date.' }, { status: 400 });
    }

    const rawAdults = parseInt(data.adults || data['Number of Adults'] || '1', 10) || 1;
    const rawInfants = parseInt(data.infants || data['Number of Infants'] || '0', 10) || 0;
    if (rawInfants > 15 || rawAdults > 90) {
      console.warn('Spambot blocked due to unreasonable passenger counts:', { rawAdults, rawInfants });
      return NextResponse.json({ error: 'Please enter a valid passenger count.' }, { status: 400 });
    }

    const rawName = String(data.name || data.Name || '').trim();
    if (rawName.length > 20 && !rawName.includes(' ') && /[A-Z]/.test(rawName) && /[a-z]/.test(rawName)) {
      console.warn('Spambot blocked due to machine-generated name pattern:', rawName);
      return NextResponse.json({ error: 'Please enter a valid name.' }, { status: 400 });
    }

    // 0c. Cloudflare Turnstile Verification
    if (process.env.TURNSTILE_SECRET_KEY) {
      const clientIp = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || request.headers.get('cf-connecting-ip') || undefined;
      const turnstileToken = data.turnstileToken || data['cf-turnstile-response'];
      const turnstileCheck = await verifyTurnstileToken(turnstileToken, clientIp);
      if (!turnstileCheck.success) {
        console.warn('Spambot blocked by Cloudflare Turnstile:', turnstileCheck.error);
        return NextResponse.json(
          { error: 'Security verification failed. Please complete the verification check.' },
          { status: 403 }
        );
      }
    }

    // 1. Identify User ID from Clerk session if signed in
    let clerkUserId: string | null = null;
    try {
      const session = await auth();
      clerkUserId = session.userId || null;
    } catch {
      // Unauthenticated / guest booking
    }

    // 2. Extract standard fields regardless of form casing
    const customerName = data.name || data.Name || 'Traveler';
    const customerEmail = (data.email || data.Email || '').trim();
    const customerPhone = data.phone || data.whatsapp || data['Phone / WhatsApp'] || '';
    const country = data.country || data.Country || '';
    const packageName = data.package || data.packageName || data.tourName || 'Custom Tour Inquiry';
    const packageId = data.packageId || null;
    const arrivalDate = data.arrival || data['Arrival Date'] || '';
    const departureDate = data.departure || data['Departure Date'] || '';
    const adults = parseInt(data.adults || data['Number of Adults'] || '1', 10) || 1;
    const children = parseInt(data.children || data['Number of Children (Age)'] || '0', 10) || 0;
    const infants = parseInt(data.infants || data['Number of Infants'] || '0', 10) || 0;
    const specialNotes = data.specialNotes || data['Special Notes'] || data.requirements || '';
    const totalPrice = data.totalPrice !== undefined && data.totalPrice !== null ? Number(data.totalPrice) : null;
    const adultTotal = data.adultTotal !== undefined ? Number(data.adultTotal) : null;
    const kidTotal = data.kidTotal !== undefined ? Number(data.kidTotal) : null;
    const infantTotal = data.infantTotal !== undefined ? Number(data.infantTotal) : null;

    // 3. Generate unique Booking Reference
    const bookingRef = `FTL-${Math.floor(100000 + Math.random() * 900000)}`;

    // 4. Save to MongoDB (Solution 1: saved with customerEmail and optional clerkUserId)
    let savedBooking = null;
    if (customerEmail) {
      try {
        savedBooking = await (prisma.booking as any).create({
          data: {
            bookingRef,
            clerkUserId,
            customerName,
            customerEmail: customerEmail.toLowerCase(),
            customerPhone,
            country,
            packageId,
            packageName,
            arrivalDate,
            departureDate,
            adults,
            children,
            infants,
            adultTotal,
            kidTotal,
            infantTotal,
            totalPrice,
            status: 'PENDING',
            specialNotes,
          },
        });
      } catch (dbErr) {
        console.error('Failed to save booking in DB:', dbErr);
      }
    }

    // 5. Format readable summary table for emails (exclude internal database & calculation fields)
    const hiddenEmailKeys = [
      'packageId',
      'pricingTiers',
      'totalPrice',
      'adultTotal',
      'kidTotal',
      'infantTotal',
      'turnstileToken',
      'cf-turnstile-response',
      'website_url',
      'company_fax',
      'honeypot',
    ];

    const detailsHtml = Object.entries(data)
      .filter(([k]) => !hiddenEmailKeys.includes(k))
      .map(
        ([key, value]) =>
          `<tr><td style="padding: 6px 12px; font-weight: 600; color: #002D37; border-bottom: 1px solid #eee; width: 40%;">${key}:</td><td style="padding: 6px 12px; color: #333; border-bottom: 1px solid #eee;">${value}</td></tr>`
      )
      .join('');

    const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL || process.env.GMAIL_TO_EMAIL || 'info@flytolanka.com';
    const resendApiKey = process.env.RESEND_API_KEY;
    const isResendConfigured = resendApiKey && !resendApiKey.includes('placeholder');

    // 6. Send Emails: Either via Resend OR fallback to Gmail Nodemailer
    let emailSentViaResend = false;
    if (isResendConfigured) {
      try {
        const resend = new Resend(resendApiKey);

        // A. Admin notification email
        await resend.emails.send({
          from: process.env.SENDER_EMAIL || 'Fly To Lanka Tours <bookings@flytolanka.com>',
          to: adminEmail,
          replyTo: customerEmail || undefined,
          subject: `🚨 [${bookingRef}] New Booking Request - ${customerName} (${packageName})`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
              <div style="background-color: #002D37; color: white; padding: 20px; text-align: center;">
                <h2 style="margin: 0;">New Trip Inquiry Received</h2>
                <p style="margin: 4px 0 0; font-size: 14px; opacity: 0.9;">Booking Reference: <strong>${bookingRef}</strong></p>
              </div>
              <div style="padding: 24px;">
                ${totalPrice ? `<p style="font-size: 16px; font-weight: bold; color: #186663; margin-bottom: 16px;">Estimated Total: $${totalPrice} USD</p>` : ''}
                <table style="width: 100%; border-collapse: collapse;">${detailsHtml}</table>
              </div>
            </div>
          `,
        });

        // B. Customer confirmation email
        if (customerEmail) {
          await resend.emails.send({
            from: process.env.SENDER_EMAIL || 'Fly To Lanka Tours <bookings@flytolanka.com>',
            to: customerEmail,
            replyTo: 'info@flytolanka.com',
            subject: `We've received your booking inquiry [${bookingRef}] - Fly To Lanka Tours 🇱🇰`,
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
                <div style="background-color: #002D37; color: white; padding: 24px; text-align: center;">
                  <h1 style="margin: 0; font-size: 24px;">Fly To Lanka Tours</h1>
                  <p style="margin: 4px 0 0; font-size: 14px; opacity: 0.9;">Your Booking Reference: <strong>${bookingRef}</strong></p>
                </div>
                <div style="padding: 24px; color: #333; line-height: 1.6;">
                  <h3 style="color: #002D37;">Ayubowan ${customerName}!</h3>
                  <p>Thank you for choosing Fly To Lanka Tours. We have received your trip inquiry for <strong>${packageName}</strong> and our travel team is reviewing your requirements.</p>
                  
                  ${
                    totalPrice
                      ? `<div style="background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 14px; margin: 16px 0; text-align: center;">
                           <span style="font-size: 12px; color: #166534; text-transform: uppercase; font-weight: bold;">Estimated Total</span>
                           <div style="font-size: 22px; font-weight: bold; color: #15803d; margin-top: 4px;">$${totalPrice} USD</div>
                         </div>`
                      : ''
                  }

                  <div style="background-color: #f8fafc; border-left: 4px solid #186663; padding: 16px; margin: 20px 0;">
                    <h4 style="margin: 0 0 10px; color: #186663;">Your Inquiry Summary</h4>
                    <table style="width: 100%; font-size: 14px; border-collapse: collapse;">${detailsHtml}</table>
                  </div>

                  <p>You can view and track your booking anytime by signing in at <a href="https://flytolanka.com/my-bookings" style="color: #186663; font-weight: bold;">flytolanka.com/my-bookings</a> with this email address.</p>

                  <div style="text-align: center; margin: 24px 0;">
                    <a href="https://wa.me/94765533874?text=${encodeURIComponent(
                      `Hi Fly To Lanka, I have submitted an inquiry with booking reference ${bookingRef}.`
                    )}" style="background-color: #25D366; color: white; padding: 12px 24px; border-radius: 24px; text-decoration: none; font-weight: bold; display: inline-block;">
                      Chat with us on WhatsApp
                    </a>
                  </div>
                  <hr style="border: 0; border-top: 1px solid #eee; margin: 24px 0;" />
                  <p style="font-size: 12px; color: #777; text-align: center;">
                    Fly To Lanka Tours | 24/7 Customer Support: +94 76 553 3874 | Email: info@flytolanka.com
                  </p>
                </div>
              </div>
            `,
          });
        }
        emailSentViaResend = true;
      } catch (resendError) {
        console.error('Resend delivery failed (domain may need verification), falling back to Nodemailer:', resendError);
      }
    }

    if (!emailSentViaResend && process.env.GMAIL_USER) {
      // Fallback to existing Nodemailer with Gmail SMTP
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_APP_PASSWORD,
        },
      });

      // Admin notification
      await transporter.sendMail({
        from: process.env.GMAIL_USER,
        to: adminEmail,
        replyTo: customerEmail || undefined,
        subject: `[${bookingRef}] New Form Submission from ${customerName}`,
        text: Object.entries(data)
          .filter(([key]) => !hiddenEmailKeys.includes(key))
          .map(([key, value]) => `${key}: ${value}`)
          .join('\n'),
        html: `<p><strong>Booking Ref:</strong> ${bookingRef}</p><br/>${detailsHtml}`,
      });

      // Customer confirmation
      if (customerEmail && process.env.GMAIL_USER) {
        try {
          await transporter.sendMail({
            from: process.env.GMAIL_USER,
            to: customerEmail,
            subject: `We've received your booking inquiry [${bookingRef}] - Fly To Lanka Tours`,
            html: `
              <h3>Ayubowan ${customerName}!</h3>
              <p>Thank you for inquiring with Fly To Lanka Tours. Your booking reference is <strong>${bookingRef}</strong>.</p>
              ${totalPrice ? `<p><strong>Estimated Total:</strong> $${totalPrice} USD</p>` : ''}
              <p>We will contact you shortly via email and WhatsApp (+94 76 553 3874).</p>
            `,
          });
        } catch (custErr) {
          console.error('Customer email send failed:', custErr);
        }
      }
    }

    return NextResponse.json({
      success: true,
      bookingRef,
      bookingId: savedBooking?.id || null,
    });
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error in send-form-email:', error);
    return NextResponse.json({ success: false, error: errorMsg }, { status: 500 });
  }
}
