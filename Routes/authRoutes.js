const express = require('express');
const Router = express.Router();
const {
  checkToken,
  getAuth,
  postRegister,
  postLogin,
  postReset
} = require('../Controller/authController');

Router.route('/').all(checkToken).get(getAuth);
Router.route('/register').all(checkToken).post(postRegister);
Router.route('/login').all(checkToken).post(postLogin);
Router.route('/reset').all(checkToken).post(postReset);

module.exports = Router;
