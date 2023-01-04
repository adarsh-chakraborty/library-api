console.log(process.env.PRODUCTION);
if (!process.env.PRODUCTION) {
  console.log('Development Environment dectected: Loading env variables');
  require('dotenv').config();
}
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;
const cors = require('cors');
const cookieParser = require('cookie-parser');
const libraryRoutes = require('./Routes/libraryRoutes');
const fileRoutes = require('./Routes/fileRoutes');

const authRoutes = require('./Routes/authRoutes');
const errorController = require('./Controller/errorController');
const verifyToken = require('./lib/verifyToken');

app.set('json spaces', 4);
app.use(cors());
app.use('/assets', express.static('frontend'));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.use(fileRoutes);
app.use('/api', libraryRoutes, (req, res, next) => {
  console.log('404 api hit');
  return res.status(404).json({
    status: 404,
    message: 'Resource not found'
  });
});

app.use('/auth', authRoutes);

app.get('/', verifyToken, (req, res, next) => {
  console.log('Root route was hit');

  return res.sendFile(__dirname + '/frontend/index.html');
});

app.get('*', (req, res, next) => {
  return res.status(404).sendFile(__dirname + '/frontend/404.html');
});

app.use(errorController);

mongoose.connect(process.env.MONGODB_URI, (err) => {
  if (err) {
    console.log('Error connecting to mongodb: ', err);
    return;
  }
  console.log('Connected to mongodb (Hopefully), starting server..');
  app.listen(PORT, () => {
    console.log('listening on port:' + PORT);
  });
});
