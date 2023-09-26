import express from 'express';
import sendMail from '../utils/email.js';
import catchAsync from '../utils/catchAsync.js';
const router = express.Router();

const createEmail = catchAsync(async (req, res, next) => {
  const { name, phone, email, message } = req.body;
  const html = `<p>${name} ${phone ? phone : ''} ${email} ${message} </p>`;
  await sendMail(process.env.EMAIL_FROM, html, 'customer message');
  res.status(200).json({
    status: 'success',
    message: 'message sent to email',
  });
});

router.route('/').post(createEmail);

export default router;
