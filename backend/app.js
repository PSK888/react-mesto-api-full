require('dotenv').config();

console.log(process.env.NODE_ENV); // production

const express = require('express');

const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;
const app = express();
const mongoDB = 'mongodb://localhost:27017/mestodb';
const routes = require('./routes/index');
const errorHandler = require('./middlewares/error-handler');

const corsOptions = {
  origin: [
    'http://localhost:3000',
    'https://psk888.students.nomoredomains.club',
    'http://psk888.students.nomoredomains.club',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'origin', 'Authorization'],
  credentials: true,
};

app.use(cors(corsOptions)); // ПЕРВЫМ!

app.use(cookieParser());

app.use(express.json()); // для собирания JSON-формата

mongoose.connect(mongoDB);

app.use(requestLogger); // подключаем логгер запросов

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(routes); // подключаем обработчики роутов

app.use(errorLogger); // подключаем логгер ошибок

app.use(errors()); // подключаем обработчик ошибок celebrate

app.use(errorHandler); // подключаем централизованный обработчик ошибок

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening port ${PORT}`);
});