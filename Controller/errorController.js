const { AppError } = require('../lib/Error');

const errorController = (err, req, res, next) => {
  if (err instanceof AppError) {
    return res
      .status(err.statusCode)
      .json({ message: err.message, type: err.name });
  }

  if (err instanceof SyntaxError) {
    return res.status(400).json({ message: err.message, type: 'SyntaxError' });
  }

  return res.status(500).json({ message: 'Internal server error!' });
};

module.exports = errorController;
