const Book = require('../Model/Book');
const mongoose = require('mongoose');
const { AppError } = require('../lib/Error');
const { uploadToB2 } = require('./b2Controller');

const GetAllBooks = async (req, res, next) => {
  try {
    let { page = 1, size = 4 } = req.query;
    page = parseInt(page);
    if (page <= 0 || size <= 0) {
      // next(new AppError('Invalid query parameters', 'QueryException', 400));
      throw new AppError('Invalid query parameters', 'QueryException', 400);
    }

    if (size > 30) {
      size = 30;
    }
    const limit = parseInt(size);
    const skip = (page - 1) * size;

    const countBooks = Book.countDocuments();
    const result = Book.find().limit(limit).skip(skip).select('-__v');
    const [totalBooks, books] = await Promise.all([countBooks, result]);

    res.json({
      totalBooks,
      page,
      hasNextPage: size * page < totalBooks,
      hasPrevPage: page > 1,
      nextPage: page + 1,
      prevPage: page - 1,
      lastPage: Math.ceil(totalBooks / size),
      size,
      books
    });
  } catch (err) {
    throw new AppError(err.message, 'InternalError', 500);
  }
};

const postBook = async (req, res) => {
  const { name, book, author, price } = req.body;
  const imageFile = req.file;

  if (!name || !book || !author || !price) {
    let msg = `Abe ${name ? '' : 'name,'}${book ? '' : 'book,'}${
      author ? '' : 'author,'
    }${price ? '' : 'price'} kon dega be?`;

    throw new AppError(msg, 'MissingFieldsError', 400);
  }

  if (isNaN(price)) {
    throw new AppError(
      'price must be a valid integer!',
      'ValidationError',
      400
    );
  }

  console.log('imageFile', imageFile);

  if (!imageFile) {
    throw new AppError(
      'Error: Image is required! Select a image',
      'MissingFieldsError',
      400
    );
  }

  const imageUrl = await uploadToB2(imageFile);
  console.log(imageUrl);

  Book.create({
    name,
    book,
    author,
    price,
    imageUrl
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

  if (price && isNaN(price)) {
    throw new AppError(
      'price must be a valid integer!',
      'ValidationError',
      422
    );
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
      return res.status(202).json({
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
      return res.status(202).json({
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
  GetAllBooks,
  postBook,
  putUpdateBook,
  deleteBook,
  getBookDetails
};
