const URL_REGEXP = /^((ftp|http|https):\/\/)?(www\.)?([A-Za-zА-Яа-я0-9]{1}[A-Za-zА-Яа-я0-9\\-]*\.?)*\.{1}[A-Za-zА-Яа-я0-9-]{2,8}(\/([\w#!:.?+=&%@!\-\\/])*)?/;

const REQUIRE_AUTHORIZATION = 'Необходима авторизация.';
const MOVIE_NOT_FOUND = 'Фильм с указанным id не найден.';
const USER_NOT_FOUND = 'Пользователь по указанному id не найден.';
const MOVIE_DELETE_OTHER_USER = 'Нельзя удалить фильм другого пользователя.';
const INVALID_DATA = 'Переданы некорректные данные.';
const EMAIL_ALREADY_REGISTERED = 'Пользователь с такой почтой уже зарегистрирвован.';
const INVALID_EMAIL_OR_PASSWORD = 'Неправильный адрес электронной почты или неверный пароль.';
const SERVER_ERROR = 'На сервере произошла ошибка.';

module.exports = {
  URL_REGEXP,
  REQUIRE_AUTHORIZATION,
  MOVIE_NOT_FOUND,
  USER_NOT_FOUND,
  MOVIE_DELETE_OTHER_USER,
  INVALID_DATA,
  EMAIL_ALREADY_REGISTERED,
  INVALID_EMAIL_OR_PASSWORD,
  SERVER_ERROR,
};
