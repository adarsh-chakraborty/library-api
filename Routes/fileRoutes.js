const express = require('express');
const verifyToken = require('../lib/verifyToken');
const { logout } = require('../Controller/authController');

const Router = express.Router();

const getAddBook = async (req, res, next) => {
  res.sendFile(require.main.path + '/frontend/Add/index.html');
};

const getBook = async (req, res, next) => {
  res.sendFile(require.main.path + '/frontend/Book/index.html');
};

const getLogin = async (req, res, next) => {
  res.sendFile(require.main.path + '/frontend/Login/index.html');
};
const getSignup = async (req, res, next) => {
  res.sendFile(require.main.path + '/frontend/Signup/index.html');
};

const getProfile = async (req, res, next) => {
  res.sendFile(require.main.path + '/frontend/Profile/index.html');
};
Router.get('/login', getLogin);
Router.get('/signup', getSignup);
Router.get('/logout', logout);
Router.get('/profile', verifyToken, getProfile);
Router.get('/add-book', verifyToken, getAddBook);
Router.get('/books/:bookid', verifyToken, getBook);

module.exports = Router;
