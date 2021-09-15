require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;
const libraryRoutes = require('./Routes/libraryRoutes');

app.use(express.urlencoded({ extended: true }));
app.use('/projects/library', libraryRoutes);

app.use((req, res, next) => {
	res.send(`<p><strong>Hii, You're too soon,&nbsp;</strong></p>
    <p><strong>This site is under construction, check back later! <img src="https://html-online.com/editor/tiny4_9_11/plugins/emoticons/img/smiley-laughing.gif" alt="laughing" /></strong></p>`);
});

mongoose.connect(process.env.MONGODB_URI, () => {
	console.log('Connected to mongodb (Hopefully), starting server...');
	app.listen(3000, () => {
		console.log('listening on port: ' + PORT);
	});
});
