const express = require('express');
const Router = express.Router();
const verifyToken = require('../lib/verifyToken');
const catchAsync = require('../utils/catchAsync');

const {
  getAuth,
  postRegister,
  postLogin,
  getLogin,
  postReset
} = require('../Controller/authController');

Router.route('/').get(catchAsync(getAuth));
Router.route('/register').post(catchAsync(postRegister));
Router.route('/login').get(catchAsync(getLogin)).post(catchAsync(postLogin));
Router.route('/reset').all(verifyToken).post(catchAsync(postReset));

module.exports = Router;
