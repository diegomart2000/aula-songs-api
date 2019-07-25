require('dotenv').config();
require('./util/mongoose');

const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');

const routes = require('./routes');

const { log, error } = require('./util/logger');

const HOST = process.env.HOST;
const PORT = process.env.PORT;
const ENV = process.env.NODE_ENV || 'development';

const app = express();

app.set('view engine', 'pug');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());

app.use((err, req, res, next) => {
  error(err.stack);
  res.status(500).redirect('/500');
});

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", process.env.CLIENT_BASE_URL);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

routes(app);

app.listen(PORT, HOST, () => {
  log(`App is running: 🌎 ${HOST}:${PORT} - ${ENV} mode `);
});
