const express = require('express');
const Router = express.Router();
const Book = require('../Model/Book');


function checkToken(req, res, next) {
	const token = req.headers['token'];
	console.log(token);
	if (!token) {
		return res.status(400).json({ error: 'Unauthorized request', status: 400 });
	}
	if (token !== 'superdoge1234') {
		return res.status(400).json({ error: 'Unauthorized request', status: 400 });
	}
	console.log(token);
	next();
}

Router.get('/books', checkToken, (req, res, next) => {
	Book.find()
		.select('-__v -_id')
		.then((books) => {
			res.json(books);
		});
});

Router.post('/books', checkToken, (req, res, next) => {
	const { name, book, author, price } = req.body;
	console.log(req.body);
	if (!name || !book || !author || !price) {
		let msg = `Abe ${name ? '' : 'name,'}${book ? '' : 'book,'}${
			author ? '' : 'author,'
		}${price ? '' : 'price'} kon dega be?`;
		return res.status(400).json({ error: msg, status: 400 });
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
