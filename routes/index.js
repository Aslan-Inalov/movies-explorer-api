const router = require('express').Router();

const usersRouter = require('./users');
const moviesRouter = require('./movies');
const authRouter = require('./auth');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/NotFoundError');

router.use(authRouter);
router.use('/users', auth, usersRouter);
router.use('/movies', auth, moviesRouter);
router.use('*', auth, (req, res, next) => {
  next(new NotFoundError('Такой страницы не существует'));
});

module.exports = router;
