const express = require('express');
const Router = express.Router();
const Book = require('../Model/Book');


Router.get('/books', (req, res, next) => {
	Book.find()
		.select('-__v -_id')
		.then((books) => {
			res.json(books);
		});
});



Router.post('/books', (req, res, next) => {
	const { name, book, author, price } = req.body;

	if (!name || !book || !author || !price) {
		let msg = `Abe ${name ? '' : 'name,'}${book ? '' : 'book,'}${
			author ? '' : 'author,'
		}${price ? '' : 'price'} kon dega be?`;
		return res.status(400).send(msg);
	}

	Book.create({
		name,
		book,
		author,
		price
	}).then((doc) => {
		res.json({
			result: 'success',
			...doc._doc
		});
	});
});

module.exports = Router;
