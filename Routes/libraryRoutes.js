const express = require('express');
const Router = express.Router();
const verifyToken = require('../lib/verifyToken');
const catchASync = require('../utils/catchAsync');
const multer = require('multer');

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, './uploads');
//   },
//   filename: function (req, file, cb) {
//     const filename = Math.random().toString(36).slice(2, 7) + file.originalname;
//     cb(null, filename);
//   }
// });
const storage = multer.memoryStorage();
const upload = multer({ storage });

const {
  GetAllBooks,
  postBook,
  putUpdateBook,
  deleteBook,
  getBookDetails
} = require('../Controller/bookController');

Router.route('/books')
  .get(catchASync(GetAllBooks))
  // .all(catchASync(verifyToken))
  .post(upload.single('img'), catchASync(postBook))
  .put(catchASync(putUpdateBook))
  .delete(catchASync(deleteBook));

Router.get('/books/:bookid', catchASync(getBookDetails));

module.exports = Router;
