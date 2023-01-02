const express = require('express');
const Router = express.Router();
const verifyToken = require('../lib/verifyToken');
const catchASync = require('../utils/catchAsync');
const multer = require('multer');
const multerS3 = require('multer-s3');
aws = require('aws-sdk');
console.log('key', process.env.AWS_SECRET_ACCESS_KEY);
console.log('key', process.env.AWS_ACCESS_KEY_ID);

aws.config.update({
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  region: process.env.AWS_REGION
});

s3 = new aws.S3();

const upload = multer({
  storage: multerS3({
    s3: s3,
    acl: 'public-read',
    bucket: process.env.BUCKET_NAME,
    key: function (req, file, cb) {
      console.log(file);
      cb(null, file.originalname); //use Date.now() for unique file keys
    }
  })
});
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, './uploads');
//   },
//   filename: function (req, file, cb) {
//     const filename = Math.random().toString(36).slice(2, 7) + file.originalname;
//     cb(null, filename);
//   }
// });
// const upload = multer({ storage });

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

Router.get('/books/:bookid', verifyToken, catchASync(getBookDetails));

module.exports = Router;
