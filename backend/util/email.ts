import nodemailer from 'nodemailer';
const { SMTP_USER, SMTP_PASS } = require('../util/config');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
});

export async function sendResetEmail(email: string, resetLink: string) {
  return transporter.sendMail({
    from: `SoundChoice Support <${SMTP_USER}>`,
    to: email,
    subject: 'Reset Your Password',
    html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`,
  });
}

export async function sendVerificationEmail(
  to: string,
  verificationUrl: string,
) {
  return transporter.sendMail({
    from: `SoundChoice Support <${SMTP_USER}>`,
    to,
    subject: 'Verify your email address',
    html: `<p>Click <a href="${verificationUrl}">here</a> to verify your email. This link will expire in 1 hour.</p>`,
  });
}
