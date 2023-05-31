const moviesRouter = require('express').Router();
const { celebrate } = require('celebrate');

const {
  createMovieValidation,
  deleteMovieValidation,
} = require('../utils/validation');

const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');

moviesRouter.get('/', getMovies);
moviesRouter.post('/', celebrate(createMovieValidation), createMovie);
moviesRouter.delete('/:_id', celebrate(deleteMovieValidation), deleteMovie);

module.exports = moviesRouter;
