const express = require('express');
const Router = express.Router();
const verifyToken = require('../lib/verifyToken');
const catchAsync = require('../utils/catchAsync');

const {
  postRegister,
  postLogin,
  getProfile
} = require('../Controller/authController');

Router.route('/signup').post(catchAsync(postRegister));
Router.route('/login').post(catchAsync(postLogin));
Router.route('/profile').get(verifyToken, catchAsync(getProfile));

module.exports = Router;
