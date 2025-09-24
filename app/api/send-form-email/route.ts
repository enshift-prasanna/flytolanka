
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
		// Format the form data for better readability
		const formatFormData = (data: any) => {
			return Object.entries(data)
				.map(([key, value]) => `<strong>${key}:</strong> ${value}`)
				.join('<br><br>');
		};

		const formattedData = formatFormData(data);
		
		const mailOptions = {
			from: process.env.GMAIL_USER,
			to: process.env.GMAIL_TO_EMAIL,
			subject: 'New Form Submission',
			text: Object.entries(data).map(([key, value]) => `${key}: ${value}`).join('\n'),
			html: formattedData
		};
		await transporter.sendMail(mailOptions);
		return NextResponse.json({ success: true });
	} catch (error) {
		const errorMsg = error instanceof Error ? error.message : 'Unknown error';
		return NextResponse.json({ success: false, error: errorMsg }, { status: 500 });
	}
}
