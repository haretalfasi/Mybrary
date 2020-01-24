const express = require('express');
const router = express.Router();
const Author = require('../models/author');

// All authors
router.get('/', async (req, res) => {
	let searchOptions = {};
	// For GET requests, the data is stored in req.query
	// For POST request, the data is stored in req.body
	if (req.query.name != null && req.query.name !== '') {
		searchOptions.name = new RegExp(req.query.name, 'i');
	}
	try {
		const authors = await Author.find(searchOptions);
		res.render('authors/index', { authors, searchOptions: req.query })
	} catch (error) {
		console.log(error);
		res.redirect('/');
	}
});

// New author
router.get('/new', (req, res) => {
	res.render('authors/new', { author: new Author() })
});

// Create author
router.post('/', async (req, res) => {
	const author = new Author({
		name: req.body.name
	})
	try {
		const newAuthor = await author.save();
		res.redirect('authors');
	} catch (error) {
		res.render('authors/new', {
			author: author,
			errorMessage: 'Error creating author'
		})
	}
});

module.exports = router;