const { AppError } = require('../lib/Error');

const verifyToken = (req, res, next) => {
  const token = req.headers['token'];
  if (!token) {
    throw new AppError(
      'Unauthorized request, Auth token required.',
      'AuthorizationError',
      401
    );
  }

  if (token !== 'superdoge1234') {
    throw new AppError(
      'Unautorized request, Invalid token',
      'AuthorizationError',
      401
    );
  }
  next();
};

module.exports = verifyToken;
