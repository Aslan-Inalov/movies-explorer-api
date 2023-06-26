const router = require('express').Router();

const usersRouter = require('./users');
const moviesRouter = require('./movies');
const authRouter = require('./auth');
// const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/NotFoundError');

router.use(authRouter);
router.use('/users', usersRouter);
router.use('/movies', moviesRouter);
router.use('*', (req, res, next) => {
  next(new NotFoundError('Такой страницы не существует'));
});

module.exports = router;
