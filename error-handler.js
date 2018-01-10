const httpStatus = require('http-status');

function notFound(req, res, next) {
  let err = new Error('Not Found');
  err.status = httpStatus.NOT_FOUND;
  next(err);
};

function error(err, req, res, next) {
  res.status(err.status || httpStatus.INTERNAL_SERVER_ERROR)
    .json({ message: err.message, error: {} });
};

module.exports = {
  notFound,
  error,
};
