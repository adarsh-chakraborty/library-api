const Book = require('../Model/Book');
const mongoose = require('mongoose');
const { AppError } = require('../lib/Error');

const OK = (req, res, next) => {
  res.status(200).json({ status: 200, message: 'OK' });
};

const GetAllBooks = async (req, res, next) => {
  let { page = 1, size = 5 } = req.query;

  if (page <= 0 || size <= 0) {
    // next(new AppError('Invalid query parameters', 'QueryException', 400));
    throw new AppError('Invalid query parameters', 'QueryException', 400);
  }

  if (size > 10) {
    size = 25;
  }

  const limit = parseInt(size);
  const skip = (page - 1) * size;

  const books = await Book.find().limit(limit).skip(skip).select('-__v');
  res.json({ page, size, books });
};

const postBook = (req, res) => {
  const { name, book, author, price } = req.body;
  if (!name || !book || !author || !price) {
    let msg = `Abe ${name ? '' : 'name,'}${book ? '' : 'book,'}${
      author ? '' : 'author,'
    }${price ? '' : 'price'} kon dega be?`;

    throw new AppError(msg, 'MissingFieldsError', 422);
  }

  Book.create({
    name,
    book,
    author,
    price
  }).then((doc) => {
    res.status(201).json({
      result: 'success',
      message: 'Book created!',
      created_book: { ...doc._doc }
    });
  });
};

const putUpdateBook = (req, res) => {
  const { _id: bookid, name, book, author, price } = req.body;
  if (!bookid) {
    throw new AppError(
      'Please provide the ID of the book you want to update.',
      'MissingFieldsError',
      422
    );
  }

  if (!mongoose.isValidObjectId(bookid)) {
    throw new AppError('Invalid Book Id', 'ValidationError', 422);
  }

  let updatedBook = {
    name,
    book,
    author,
    price
  };

  Book.findByIdAndUpdate(bookid, { $set: updatedBook }, { new: true })
    .then((doc) => {
      if (!doc) {
        throw new AppError('No book found with that ID', 'BookNotFound', 404);
      }
      return res.status(201).json({
        result: 'success',
        message: 'Book updated!',
        updated_book: doc
      });
    })
    .catch((err) => {
      throw new AppError(err.message, 'InternalError', 500);
    });
};

const deleteBook = (req, res) => {
  const { _id: bookid } = req.body;
  if (!bookid) {
    throw new AppError(
      'Please provide the ID of the book you want to update.',
      'MissingFieldsError',
      422
    );
  }
  if (!mongoose.isValidObjectId(bookid)) {
    throw new AppError('Invalid Book Id', 'ValidationError', 422);
  }

  Book.findByIdAndDelete(bookid)
    .then((doc) => {
      if (!doc) {
        throw new AppError('No book found with that ID', 'BookNotFound', 404);
      }
      return res.status(201).json({
        result: 'success',
        message: 'Book deleted!',
        deleted_book: { ...doc._doc }
      });
    })
    .catch((err) => {
      throw new AppError(err.message, 'InternalError', 500);
    });
};

const getBookDetails = (req, res, next) => {
  const { bookid } = req.params;
  if (!mongoose.isValidObjectId(bookid)) {
    throw new AppError('Invalid Book Id', 'ValidationError', 422);
  }

  Book.findById(bookid)
    .select('-__v')
    .then((docs) => {
      if (!docs) {
        throw new AppError('No book found with that ID', 'BookNotFound', 404);
      }
      res.json(docs);
    });
};

module.exports = {
  OK,
  GetAllBooks,
  postBook,
  putUpdateBook,
  deleteBook,
  getBookDetails
};
