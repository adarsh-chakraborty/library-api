const { AppError } = require('../lib/Error');

const errorController = (err, req, res, next) => {
  if (err instanceof AppError) {
    return res
      .status(err.statusCode)
      .json({ message: err.message, type: err.name });
  }

  return res.status(500).json({ message: 'Internal server error!' });
};

module.exports = errorController;
