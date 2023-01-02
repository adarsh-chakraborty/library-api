const express = require('express');
const Router = express.Router();

const getAddBook = async (req, res, next) => {
  res.sendFile(require.main.path + '/frontend/Add/index.html');
};

Router.get('/add-book', getAddBook);
module.exports = Router;
