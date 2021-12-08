const express = require('express');
const Router = express.Router();
const verifyToken = require('../lib/verifyToken');
const catchAsync = require('../utils/catchAsync');

const {
  getAuth,
  postRegister,
  postLogin,
  postReset
} = require('../Controller/authController');

Router.route('/').all(verifyToken).get(catchAsync(getAuth));
Router.route('/register').all(verifyToken).post(catchAsync(postRegister));
Router.route('/login').all(verifyToken).post(catchAsync(postLogin));
Router.route('/reset').all(verifyToken).post(catchAsync(postReset));

module.exports = Router;
