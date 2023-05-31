const authRouter = require('express').Router();
const { celebrate } = require('celebrate');
const { signupValidation, signinValidation } = require('../utils/validation');

const { createUser, login } = require('../controllers/users');

authRouter.post('/signup', celebrate(signupValidation), createUser);
authRouter.post('/signin', celebrate(signinValidation), login);

module.exports = authRouter;
