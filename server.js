if (!process.env.HEROKU) {
	require('dotenv').config();
}
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;
const cors = require('cors');
const libraryRoutes = require('./Routes/libraryRoutes');
app.set('json spaces', 4);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/library', libraryRoutes);

app.use((req, res, next) => {
	res.status(400).send(` <!DOCTYPE html>
	<html lang="en">
	<head>
		<meta charset="UTF-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title>Error 400</title>
		<style>
			
			h2 {
				padding-left: 20px;
				padding-top: 5px;
				font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
				
			}

			h3{
				font-family: Arial, Helvetica, sans-serif;
				padding-left: 20px;
				
			}
		</style>
	</head>
	<body>
		<h2>Response 400 Bad Request</h2>
		<h3>This site is under construction, visit later.</h3>
	</body>
	</html>
	`);
});

mongoose.connect(process.env.MONGODB_URI, () => {
	console.log('Connected to mongodb (Hopefully), starting server...');
	app.listen(PORT, () => {
		console.log('listening on port: ' + PORT);
	});
});
