const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');

const { SendEmails } = require('../controllers/controller.sendEmail');

const emailMsgRoute = express.Router();

emailMsgRoute.post('/', authMiddleware, SendEmails);

module.exports = emailMsgRoute;
