const express = require('express');
const Router = express.Router();
const Book = require('../Model/Book');
const mongoose = require('mongoose');

function checkToken(req, res, next) {
	const token = req.headers['token'];
	if (!token) {
		return res.status(401).json({
			result: 'error',
			message: 'Unauthorized request, Missing auth token',
			status: 401
		});
	}
	if (token !== 'superdoge1234') {
		return res.status(401).json({
			result: 'error',
			message: 'Unauthorized request, auth token is not valid.',
			status: 401
		});
	}
	next();
}

Router.get('/', (req, res, next) => {
	res.status(200).json({ status: 200, message: 'OK' });
});

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
		if (!name || !book || !author || !price) {
			let msg = `Abe ${name ? '' : 'name,'}${book ? '' : 'book,'}${
				author ? '' : 'author,'
			}${price ? '' : 'price'} kon dega be?`;
			return res
				.status(400)
				.json({ result: 'error', message: msg, status: 400 });
		}

		Book.create({
			name,
			book,
			author,
			price
		}).then((doc) => {
			res.json({
				result: 'success',
				message: 'Book created!',
				created_book: { ...doc._doc }
			});
		});
	})
	.put((req, res) => {
		const { _id: bookid, name, book, author, price } = req.body;
		if (!bookid) {
			return res.status(400).json({
				result: 'error',
				message: 'Please provide the ID of the book you want to update.',
				status: 400
			});
		}

		if (!mongoose.isValidObjectId(bookid)) {
			return res.status(400).json({
				result: 'error',
				message: 'Invalid bookid',
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
					return res.status(400).json({
						result: 'error',
						message: 'No book exists with that ID.',
						status: 400
					});
				}
				return res.json({
					result: 'success',
					message: 'Book updated!',
					updated_book: doc
				});
			})
			.catch((err) => {
				return res.status(500).json({
					result: 'error',
					message: 'Internal server error, try again later...',
					status: 500
				});
			});
	})
	.delete((req, res) => {
		const { _id: bookid } = req.body;
		if (!bookid) {
			return res.status(400).json({
				result: 'error',
				message: 'Please provide the ID of the book you want to delete.',
				status: 400
			});
		}
		if (!mongoose.isValidObjectId(bookid)) {
			return res.status(400).json({
				result: 'error',
				message: 'Invalid bookid',
				status: 400
			});
		}

		Book.findByIdAndDelete(bookid)
			.then((doc) => {
				if (!doc) {
					return res.status(400).json({
						result: 'error',
						message: 'No book exists with that ID.',
						status: 400
					});
				}
				return res.json({
					result: 'success',
					message: 'Book deleted!',
					deleted_book: { ...doc._doc }
				});
			})
			.catch((err) => {
				return res.status(500).json({
					result: 'error',
					message: 'Internal server error, try again later...',
					status: 500
				});
			});
	});

Router.get('/books/:bookid', (req, res, next) => {
	const { bookid } = req.params;
	if (!mongoose.isValidObjectId(bookid)) {
		return res.status(400).json({ error: 'Invalid book id', status: 400 });
	}
	Book.findById(bookid)
		.select('-__v')
		.then((docs) => {
			if (!docs) {
				return res
					.status(404)
					.json({ error: 'No book exists with that ID', status: 404 });
			}
			res.json(docs);
		});
});

module.exports = Router;
