const jwt = require('jsonwebtoken');
const { AppError } = require('../lib/Error');
const catchASync = require('../utils/catchAsync');

const verifyToken = catchASync(async (req, res, next) => {
  const cookie = req.cookies;

  if (!cookie?.auth) return res.redirect('/login');

  const token = cookie.auth;
  console.log('Received auth token', token);

  if (!token) {
    return res.redirect('/login');
  }

  jwt.verify(token, process.env.SECRET_REFRESH, (err, user) => {
    if (err) {
      console.log(err);
      console.log('meooowww');
      return res.redirect('/login');
    }
    console.log('token validated');
    req.user = user;
    next();
  });
});

module.exports = verifyToken;
