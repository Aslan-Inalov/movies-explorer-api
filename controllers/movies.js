const Movie = require('../models/movie');

const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');
const NotFoundError = require('../errors/NotFoundError');

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
          new BadRequestError('Переданы некорректные данные.'),
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
  const { movieId } = req.params;
  Movie.findById(movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('Карточка с указанным _id не найдена.');
      }
      const owner = movie.owner.toString();
      if (req.user._id !== owner) {
        throw new ForbiddenError('Чужие карточки удалить нельзя!');
      }
      return Movie.findByIdAndRemove(movie)
        .then((deletedMovie) => {
          res.send({ movie: deletedMovie });
        });
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные.'));
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
