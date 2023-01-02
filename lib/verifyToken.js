const jwt = require('jsonwebtoken');
const { AppError } = require('../lib/Error');
const catchASync = require('../utils/catchAsync');

const verifyToken = catchASync(async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  console.log('Received auth token', token);

  if (!token) {
    throw new AppError(
      'Unauthorized request, Auth token required.',
      'AuthorizationError',
      401
    );
  }

  jwt.verify(token, process.env.BOOKSHELF_SECRET_ACCESS, (err, user) => {
    if (err) {
      throw new AppError(
        'Unautorized request, Invalid token',
        'AuthorizationError',
        401
      );
    }
    console.log('token validated');
    req.token = token;
    next();
  });
});

module.exports = verifyToken;
