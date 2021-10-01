const express = require('express');
const Router = express.Router();
const Book = require('../Model/Book');
const { ObjectID } = require('mongodb');

function checkToken(req, res, next) {
	const token = req.headers['token'];
	console.log(token);
	if (!token) {
		return res
			.status(400)
			.json({ error: 'Unauthorized request, Missing auth token', status: 400 });
	}
	if (token !== 'superdoge1234') {
		return res.status(400).json({
			error: 'Unauthorized request, auth token is not valid.',
			status: 400
		});
	}
	console.log(token);
	next();
}

Router.route('/books')

	.get((req, res) => {
		Book.find()
			.select('-__v')
			.then((books) => {
				res.json(books);
			});
	})
	.all(checkToken)
	.post((req, res) => {
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
	})
	.put((req, res) => {
		const { bookid, name, book, author, price } = req.body;
		console.log(req.body);
		if (!bookid) {
			return res.status(400).json({
				error: 'Please provide the ID of the book you want to update.',
				status: 400
			});
		}
		if (!ObjectID.isValid(bookid)) {
			return res.status(400).json({
				error: 'Invalid bookid, Please provide a valid book id.',
				status: 400
			});
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
					return res
						.status(400)
						.json({ error: 'No book exists with that ID.', status: 400 });
				}
				return res.json({ result: 'success', updatedBook: doc });
			})
			.catch((err) => {
				console.log(err);
				return res.status(500).json({
					error:
						'Something went wrong, We are working on it. Try again in some time.',
					status: 500
				});
			});
	})
	.delete((req, res) => {
		const { bookid } = req.body;
		if (!bookid) {
			return res.status(400).json({
				error: 'Please provide the ID of the book you want to delete.',
				status: 400
			});
		}
		if (!ObjectID.isValid(bookid)) {
			return res.status(400).json({
				error: 'Invalid bookid, Please provide a valid book id.',
				status: 400
			});
		}
		Book.findByIdAndDelete(bookid)
			.then((doc) => {
				if (!doc) {
					return res
						.status(400)
						.json({ error: 'No book exists with that ID.', status: 400 });
				}
				return res.json({ result: 'success', ...doc._doc });
			})
			.catch((err) => {
				console.log(err);
				return res.status(500).json({
					error:
						'Something went wrong, We are working on it. Try again in some time.',
					status: 500
				});
			});
	});

	


module.exports = Router;
