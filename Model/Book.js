const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
	name: String,
	book: String,
	author: String,
	price: String
});

module.exports = mongoose.model('Book', bookSchema);


