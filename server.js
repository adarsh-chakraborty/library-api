if (!process.env.PRODUCTION) {
  require('dotenv').config();
}
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;
const cors = require('cors');
const libraryRoutes = require('./Routes/libraryRoutes');
const authRoutes = require('./Routes/authRoutes');
const errorController = require('./Controller/errorController');

app.set('json spaces', 4);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api', libraryRoutes);
app.use('/auth', authRoutes);

app.get('/', (req, res, next) => {
  res.redirect('/api');
});

app.use('*', (req, res, next) => {
  res.status(404).json({
    status: 404,
    message: 'Resource not found'
  });
});

app.use(errorController);

mongoose.connect(process.env.MONGODB_URI, (err) => {
  if (err) {
    console.log('Error connecting to mongodb: ', err);
    return;
  }
  console.log('Connected to mongodb (Hopefully), starting server..');
  app.listen(PORT, () => {
    console.log('listening on port: ' + PORT);
  });
});
