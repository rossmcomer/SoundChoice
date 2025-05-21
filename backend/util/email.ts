import nodemailer from 'nodemailer';

export async function sendResetEmail(email: string, resetLink: string) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    to: email,
    subject: 'Reset Your Password',
    html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`,
  });
}