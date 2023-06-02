const { SERVER_ERROR } = require('../utils/constants');

module.exports = (error, req, res, next) => {
  const { statusCode = 500, message } = error;

  res.status(statusCode).send({
    message: statusCode === 500 ? SERVER_ERROR : message,
  });
  next();
};
