require('dotenv').config();

const {
  NODE_ENV,
  PORT = 3000,
  DB_PATH,
} = process.env;

module.exports = {
  PORT,
  DB_PATH: NODE_ENV === 'production' ? DB_PATH : 'mongodb://localhost:27017/bitfilmsdb',
};
