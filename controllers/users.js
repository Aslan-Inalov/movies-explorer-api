require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const { NODE_ENV, JWT_SECRET } = process.env;
const ConflictError = require('../errors/ConflictError');
const BadRequestError = require('../errors/BadRequestError');
const UnauthorizedError = require('../errors/UnauthorizedError');
const NotFoundError = require('../errors/NotFoundError');
const {
  USER_NOT_FOUND, INVALID_DATA, EMAIL_ALREADY_REGISTERED, INVALID_EMAIL_OR_PASSWORD,
} = require('../utils/constants');

const createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then((hash) => {
    User.create({
      email: req.body.email,
      password: hash,
      name: req.body.name,
    })
      .then((newUser) => res.status(201).send({
        email: newUser.email,
        name: newUser.name,
      }))
      .catch((error) => {
        if (error.code === 11000) {
          return next(
            new ConflictError(EMAIL_ALREADY_REGISTERED),
          );
        }
        if (error.name === 'ValidationError') {
          return next(
            new BadRequestError(INVALID_DATA),
          );
        }
        return next(error);
      });
  })
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return next(
          new UnauthorizedError(INVALID_EMAIL_OR_PASSWORD),
        );
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return next(new UnauthorizedError(INVALID_EMAIL_OR_PASSWORD));
          }
          const token = jwt.sign(
            { _id: user._id },
            NODE_ENV === 'production' ? JWT_SECRET : 'JWT_SECRET',
            {
              expiresIn: '7d',
            },
          );
          return res.send({ token });
        });
    })
    .catch(next);
};

const getUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        return next(new NotFoundError(USER_NOT_FOUND));
      }
      return res.send(user);
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        return next(
          new BadRequestError(INVALID_DATA),
        );
      }
      return next(error);
    });
};

const updateProfile = (req, res, next) => {
  const owner = req.user._id;
  const { name, email } = req.body;

  User.findByIdAndUpdate(
    owner,
    { name, email },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        return next(
          new NotFoundError(USER_NOT_FOUND),
        );
      }
      return res.send(user);
    })
    .catch((error) => {
      if (error.code === 11000) {
        return next(
          new ConflictError(EMAIL_ALREADY_REGISTERED),
        );
      } if (error.name === 'ValidationError') {
        return next(
          new BadRequestError(INVALID_DATA),
        );
      }
      return next(error);
    });
};

module.exports = {
  createUser,
  login,
  getUser,
  updateProfile,
};
