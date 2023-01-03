const express = require('express');
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
Router.get('/add-book', getAddBook);
Router.get('/books/:bookid', getBook);
Router.get('/login', getLogin);
Router.get('/signup', getSignup);
module.exports = Router;
