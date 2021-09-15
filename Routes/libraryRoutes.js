const express = require('express');
const Router = express.Router();
const Book = require('../Model/Book');

Router.get('/books', (req, res, next) => {
	Book.find().then((books) => {
		res.json(books);
	});
});

Router.post('/books', (req, res, next) => {
	const { name, book, author, price } = req.body;

	if (!name || !book || !author || !price) {
		return res.send('Error: all fields are required!');
	}

	Book.create({
		name,
		book,
		author,
		price
	}).then((doc) => {
		res.json({
			result: 'sucess',
			...doc._doc
		});
	});
});

module.exports = Router;
