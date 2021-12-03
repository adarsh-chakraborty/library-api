const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema(
	{
		name: { type: String, required: true, trim: true },
		book: { type: String, required: true, trim: true },
		author: { type: String, required: true, trim: true },
		price: { type: String, required: true, trim: true }
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Book', bookSchema, 'books');
