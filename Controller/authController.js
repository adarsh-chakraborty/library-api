const { AppError } = require('../lib/Error');

const User = require('../Model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const postRegister = async (req, res, next) => {
  console.log(req.body);
  const { email, username, password } = req.body;

  if (!email || !username || !password) {
    console.log(email, username, password);
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
  res.status(201).json({
    result: 'success',
    message: `Account Created! You can login now! Redirecting in 5s..`
  });
};

const postLogin = async (req, res, next) => {
  console.log('login request received');
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
    // ALL OK

    const refreshToken = jwt.sign(
      { id: user._id, email: user.email, username: user.username },
      process.env.SECRET_REFRESH,
      {
        expiresIn: '7d'
      }
    );

    res.cookie('auth', refreshToken, {
      httpOnly: true,
      secure: true,
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    return res.status(202).json({
      result: 'OK',
      message: 'You are now logged in!'
    });
  }

  throw new AppError('Wrong Username or password', 'AuthorizationError', 401);
};

const getProfile = async (req, res, next) => {
  // to be implemented
  const { email, username } = req.user;
  return res.json({ email, username });
};

const logout = (req, res, next) => {
  res.clearCookie('auth', {
    httpOnly: true,
    secure: true
  });
  res.redirect('/login');
};

function isValidEmail(email) {
  if (!email) return false;
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailPattern.test(email);
}

module.exports = { postRegister, postLogin, getProfile, logout };
