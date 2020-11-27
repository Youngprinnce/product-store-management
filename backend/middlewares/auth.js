const jwt = require('jsonwebtoken');
const { sendError} = require('../utils/responseHandler');

const checkLoggedIn = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    const message = 'Unauthorized access';
    return sendError(res, message, 401);
  }
  try {
    const user = jwt.verify(token, process.env.SECRET_TOKEN);
    req.user = user.user;
    next();
  } catch (error) {
    const message = 'Invalid Token';
    return sendError(res, message, 500);
  }
};

const adminRole = (req, res, next) => {
  if (req.user === null) {
    const message = 'Access denied';
    return sendError(res, message, 400);
  }

  if (req.user.role !== 'admin') {
    const message = 'Unauthorized request';
    return sendError(res, message, 403);
  }
  next();
};

module.exports = {
  checkLoggedIn,
  adminRole,
};
