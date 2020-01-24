const mongoose = require('mongoose');

// Basically a table template
const authorSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	}
});

// Name of table and template
module.exports = mongoose.model('Author', authorSchema);