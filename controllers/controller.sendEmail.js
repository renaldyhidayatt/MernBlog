const emailMessageModel = require('../models/EmailMessaging');
const Filter = require('bad-words');
const sendEmail = require('../utils/utils.emailSending');

const SendEmails = async (req, res) => {
  const { to, subject, message } = req.body;

  const emailMessage = subject + ' ' + message;

  const filter = new Filter();

  const isProfane = filter.isProfane(emailMessage);
  if (isProfane)
    throw new Error('Email sent failed, because it contains profane words.');

  try {
    const msg = {
      to,
      subject,
      text: message,
      from: 'twentekghana@gmail.com',
    };

    await sendEmail(msg.to, msg.subject, msg.html, msg.from);

    await emailMessageModel.create({
      sentBy: req?.user?._id,
      from: req?.user?.email,
      to,
      message,
      subject,
    });
    res.json('Mail sent');
  } catch (error) {
    res.json(error);
  }
};

module.exports = {
  SendEmails,
};
