const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  // Create a transporter
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'sandbox.smtp.mailtrap.io',
    port: process.env.SMTP_PORT || 2525,
    auth: {
      user: process.env.SMTP_EMAIL || 'dummy_user',
      pass: process.env.SMTP_PASSWORD || 'dummy_password',
    },
  });

  // Define the email options
  const message = {
    from: `${process.env.FROM_NAME || 'Modern Wow'} <${process.env.FROM_EMAIL || 'noreply@modernwow.com'}>`,
    to: options.email,
    subject: options.subject,
    html: options.html, // Using HTML instead of plain text for better formatting
  };

  // Send the email
  try {
    const info = await transporter.sendMail(message);
    console.log('Message sent: %s', info.messageId);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

module.exports = sendEmail;
