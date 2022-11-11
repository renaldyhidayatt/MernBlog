const nodemailer = require('nodemailer');

async function sendEmail({ to, subject, html, from = process.env.EMAIL }) {
  const transporter = nodemailer.createTransport(process.env.SMTP_OPTIONS);
  await transporter.sendMail({ from, to, subject, html });
}

module.exports = sendEmail;
