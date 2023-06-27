require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const cors = require('cors');
const router = require('./routes');
const errorsHandler = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const limiter = require('./utils/limiter');
// const { DB_PATH, PORT } = require('./config');

const app = express();

mongoose.connect('mongodb://localhost:27017/bitfilmsdb');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());

app.use(requestLogger);
app.use(cors());
app.use(limiter);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(router);

app.use(errorLogger);
app.use(errors());
app.use(errorsHandler);

app.listen(3000, () => {
  console.log('start server');
});
