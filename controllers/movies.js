const Movie = require('../models/movie');

const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');
const NotFoundError = require('../errors/NotFoundError');
const { MOVIE_NOT_FOUND, MOVIE_DELETE_OTHER_USER, INVALID_DATA } = require('../utils/constants');

const createMovie = (req, res, next) => {
  const { _id } = req.user;
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: _id,
  })
    .then((newMovie) => {
      res.status(201).send(newMovie);
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        next(
          new BadRequestError(INVALID_DATA),
        );
        return;
      }
      next(error);
    });
};

const getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.send(movies))
    .catch(next);
};

const deleteMovie = (req, res, next) => {
  const userId = req.user._id;
  const movieId = req.params._id;
  Movie.findById(movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError(MOVIE_NOT_FOUND);
      }
      if (movie.owner.toString() !== userId) {
        throw new ForbiddenError(MOVIE_DELETE_OTHER_USER);
      }
      return Movie.deleteOne({ _id: movieId });
    })
    .then(() => res.send({ message: 'Фильм удален' }))
    .catch((error) => {
      if (error.name === 'CastError') {
        next(new BadRequestError(INVALID_DATA));
      } else {
        next(error);
      }
    });
};

module.exports = {
  createMovie,
  getMovies,
  deleteMovie,
};
