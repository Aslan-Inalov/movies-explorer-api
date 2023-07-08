require('dotenv').config();
const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;
const UnauthorizedError = require('../errors/UnauthorizedError');
const { REQUIRE_AUTHORIZATION } = require('../utils/constants');

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new UnauthorizedError(REQUIRE_AUTHORIZATION));
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : 'JWT_SECRET',
    );
  } catch (err) {
    next(new UnauthorizedError(REQUIRE_AUTHORIZATION));
  }
  req.user = payload;
  return next();
};

module.exports = auth;
