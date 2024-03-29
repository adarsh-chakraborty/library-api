const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    book: { type: String, required: true, trim: true },
    author: { type: String, required: true, trim: true },
    price: { type: Number, required: true, trim: true },
    imageUrl: { type: String, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Book', bookSchema, 'books');
