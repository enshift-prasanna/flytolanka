
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
	try {
		const data = await request.json();
		const transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: process.env.GMAIL_USER,
				pass: process.env.GMAIL_APP_PASSWORD,
			},
		});
		const mailOptions = {
			from: process.env.GMAIL_USER,
			to: process.env.GMAIL_TO_EMAIL,
			subject: 'New Form Submission',
			text: JSON.stringify(data, null, 2),
			html: `<pre>${JSON.stringify(data, null, 2)}</pre>`
		};
		await transporter.sendMail(mailOptions);
		return NextResponse.json({ success: true });
	} catch (error) {
		const errorMsg = error instanceof Error ? error.message : 'Unknown error';
		return NextResponse.json({ success: false, error: errorMsg }, { status: 500 });
	}
}
