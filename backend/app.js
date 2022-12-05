const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;
const app = express();
const mongoDB = 'mongodb://localhost:27017/mestodb';
const routes = require('./routes/index');
const errorHandler = require('./middlewares/error-handler');

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening port ${PORT}`);
});

app.use(express.json());

mongoose.connect(mongoDB);

app.use(requestLogger); // подключаем логгер запросов

app.use(routes); // подключаем обработчики роутов

app.use(errorLogger); // подключаем логгер ошибок

app.use(errors()); // подключаем обработчик ошибок celebrate

app.use(errorHandler); // подключаем централизованный обработчик ошибок
