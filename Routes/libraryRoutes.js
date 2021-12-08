const express = require('express');
const Router = express.Router();
const verifyToken = require('../lib/verifyToken');
const catchASync = require('../utils/catchAsync');

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
  .get(catchASync(GetAllBooks))
  .all(catchASync(verifyToken))
  .post(catchASync(postBook))
  .put(catchASync(putUpdateBook))
  .delete(catchASync(deleteBook));

Router.get('/books/:bookid', verifyToken, catchASync(getBookDetails));

module.exports = Router;
