const User = require('../models/User');
const { decodeJwt } = require('../utils/utils.jwt');

const authMiddleware = async (req, res, next) => {
  let token;

  if (req?.headers?.authorization?.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
    try {
      if (token) {
        const decoded = decodeJwt(token);

        const user = await User.findById(decoded?.id).select('-password');

        req.user = user;
        next();
      }
    } catch (error) {
      throw new Error('Not authorized token expired, login again');
    }
  } else {
    throw new Error('There is no token attached to the header');
  }
};

module.exports = authMiddleware;
