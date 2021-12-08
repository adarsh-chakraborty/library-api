const express = require('express');
const Router = express.Router();
const verifyToken = require('../lib/verifyToken');

const {
  OK,
  GetAllBooks,
  postBook,
  putUpdateBook,
  deleteBook,
  getBookDetails
} = require('../Controller/bookController');

Router.get('/', OK);

Router.route('/books')
  .get(GetAllBooks)
  .all(verifyToken)
  .post(postBook)
  .put(putUpdateBook)
  .delete(deleteBook);

Router.get('/books/:bookid', verifyToken, getBookDetails);

module.exports = Router;
