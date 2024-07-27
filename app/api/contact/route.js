// app/api/contact/route.js

import nodemailer from 'nodemailer';

export async function POST(request) {
  const { name, email, message } = await request.json();

  // Nodemailer 설정
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, // 발신자의 이메일 주소
      pass: process.env.EMAIL_PASSWORD, // 이메일 앱 비밀번호
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email, // 수신자의 이메일 주소 (이메일을 받을 주소로 변경)
    subject: 'New Contact Form Submission',
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent:', { name, email, message });
    return new Response(
      JSON.stringify({ message: 'Email sent successfully' }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      },
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return new Response(JSON.stringify({ error: 'Error sending email' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
