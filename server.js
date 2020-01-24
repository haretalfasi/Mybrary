if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}

const express = require('express');
const app = express();
const expressLayout = require('express-ejs-layouts');
const mongoose = require('mongoose');

// Local imports
const indexRouter = require('./routes/index');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout')

// Middleware to use layouts (header/footer of page that don't change)
app.use(expressLayout)
// Where static files will be (images/css etc)
app.use(express.static('public'));

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });
// Log if connected or not to database
const db = mongoose.connection;
db.on('error', error => console.error(error));
db.once('open', () => console.log('Connected to database!'));

app.use('/', indexRouter);

app.listen(process.env.PORT || 3000);