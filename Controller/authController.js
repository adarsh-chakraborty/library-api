const { AppError } = require('../lib/Error');

const User = require('../Model/User');
const bcrypt = require('bcryptjs');

exports.checkToken = (req, res, next) => {
  const token = req.headers['token'];
  if (!token) {
    throw new AppError(
      'Unauthorized request, Auth token required.',
      'AuthorizationError',
      401
    );
  }

  if (token !== 'superdoge1234') {
    throw new AppError(
      'Unautorized request, Invalid token',
      'AuthorizationError',
      401
    );
  }
  next();
};

exports.getAuth = (req, res, next) => {
  res.status(200).json({ message: 'OK', status: 200 });
};

exports.postRegister = async (req, res, next) => {
  const { email, username, password } = req.body;

  if (!email || !username || !password) {
    throw new AppError(
      'All the fields (email, username,password) are required!',
      'MissingFieldsError',
      422
    );
  }

  // validations

  if (!isValidEmail(email)) {
    throw new AppError('Invalid E-mail Format', 'ValidationError', 422);
  }

  // Check if password is 6 chars long
  if (password.length < 6) {
    throw new AppError(
      'Password should be minimum 6 chars long',
      'ValidationError',
      422
    );
  }

  // Check if username exists
  const docs = await User.findOne({
    $or: [{ username: username.toLowerCase() }, { email: email.toLowerCase() }]
  });

  if (docs) {
    throw new AppError('Username or E-mail already registered.', 'Error', 422);
  }

  const hashedPassword = await bcrypt.hash(password, 12);
  const doc = await User.create({ email, username, password: hashedPassword });
  res.json({ result: 'success', status: 201, user_created: doc });
};

exports.postLogin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new AppError(
      'email and password required!',
      'MissingFieldsError',
      422
    );
  }

  if (!isValidEmail(email)) {
    throw new AppError('Invalid e-mail format', 'ValidationError', 422);
  }

  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    throw new AppError('Wrong Username or password', 'AuthorizationError', 401);
  }

  if (bcrypt.compareSync(password, user.password)) {
    return res.json({
      result: 'OK',
      message: 'You are now logged in!',
      token: 'superdoge1234'
    });
  }

  throw new AppError('Wrong Username or password', 'AuthorizationError', 401);
};

exports.postReset = (req, res, next) => {
  // to be implemented
};

function isValidEmail(email) {
  if (!email) return false;
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailPattern.test(email);
}
