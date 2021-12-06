const User = require('../Model/User');
const bcrypt = require('bcrypt');

exports.checkToken = (req, res, next) => {
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
};

exports.getAuth = (req, res, next) => {
  res.status(200).json({ message: 'OK', status: 200 });
};

exports.postRegister = async (req, res, next) => {
  const { email, username, password } = req.body;

  if (!email || !username || !password) {
    return res.status(400).json({
      result: 'error',
      message: 'All the fields (email, username,password) required!'
    });
  }

  // validations

  if (!isValidEmail(email)) {
    return res.status(400).json({
      result: 'error',
      message: 'Invalid e-mail format'
    });
  }

  // Check if password is 6 chars long
  if (password.length < 6) {
    return res.status(400).json({
      result: 'error',
      message: 'Password should be atleast 6 chars long.'
    });
  }

  // Check if username exists
  const docs = await User.findOne({ username: username.toLowerCase() });
  if (docs) {
    return res.status(400).json({
      result: 'error',
      message: 'This username is already registered!'
    });
  }

  const hashedPassword = bcrypt.hashSync(password, 12);

  const doc = await User.create({ email, username, password: hashedPassword });
  res.json({ result: 'success', status: 200, user_created: doc });
};

exports.postLogin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!isValidEmail(email)) {
    return res.status(400).json({
      result: 'error',
      message: 'Invalid e-mail format'
    });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({
      result: 'error',
      message: 'Invalid email or password1'
    });
  }

  // DEBUG
  console.log('Comparing', password, user.password);
  console.log(bcrypt.compareSync(password, user.password));

  if (bcrypt.compareSync(password, user.password)) {
    return res.json({
      result: 'OK',
      message: 'You are now logged in!',
      token: 'superdoge1234'
    });
  }

  res.status(400).json({
    result: 'error',
    message: 'Invalid email or password2'
  });
};

exports.postReset = (req, res, next) => {
  // to be implemented
};

function isValidEmail(email) {
  if (!email) return false;
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailPattern.test(email);
}
