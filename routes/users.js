const usersRouter = require('express').Router();
const { celebrate } = require('celebrate');

const { updateProfileValidation } = require('../utils/validation');

const { getUser, updateProfile } = require('../controllers/users');

// Роут для получения информации о пользователе
usersRouter.get('/me', getUser);

// Роут для обновления информации о пользователе
usersRouter.patch('/me', celebrate(updateProfileValidation), updateProfile);

module.exports = usersRouter;
