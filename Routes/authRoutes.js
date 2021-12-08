const express = require('express');
const Router = express.Router();
const verifyToken = require('../lib/verifyToken');

const {
  getAuth,
  postRegister,
  postLogin,
  postReset
} = require('../Controller/authController');

Router.route('/').all(verifyToken).get(getAuth);
Router.route('/register').all(verifyToken).post(postRegister);
Router.route('/login').all(verifyToken).post(postLogin);
Router.route('/reset').all(verifyToken).post(postReset);

module.exports = Router;
