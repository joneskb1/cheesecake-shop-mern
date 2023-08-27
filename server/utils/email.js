import nodemailer from 'nodemailer';

export default async (email, url) => {
  let transporter;

  if (process.env.NODE_ENV === 'development') {
    // use mail trap
    transporter = nodemailer.createTransport({
      host: process.env.MAIL_TRAP_EMAIL_HOST,
      port: process.env.MAIL_TRAP_EMAIL_PORT,
      auth: {
        user: process.env.MAIL_TRAP_EMAIL_USERNAME,
        pass: process.env.MAIL_TRAP_EMAIL_PASSWORD,
      },
    });
  } else if (process.env.NODE_ENV === 'production') {
    // send mail through brevo
    transporter = nodemailer.createTransport({
      host: process.env.BREVO_EMAIL_HOST,
      port: process.env.BREVO_EMAIL_PORT,
      auth: {
        user: process.env.BREVO_EMAIL_USERNAME,
        pass: process.env.BREVO_EMAIL_PASSWORD,
      },
      from: process.env.BREVO_EMAIL_USERNAME,
    });
  }

  let html = `<p>Please use this link to reset your password <a href=${url}>Reset Password</a> </p>`;

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: 'Reset Password',
    html,
  };

  await transporter.sendMail(mailOptions);
};
