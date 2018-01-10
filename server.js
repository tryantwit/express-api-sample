const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const logger = require('morgan');

const errorHandlers = require('./error-handler');
const routes = require('./api');

require('./db');

const app = express();

// setup logger for HTTP requests when developing
if (app.get('env') === 'development') {
  app.use(logger('dev'));
}

app.use(cors());

app.use(helmet());
app.use(bodyParser.json());

app.use('/api', routes);

app.use(errorHandlers.notFound);
app.use(errorHandlers.error);

module.exports = app;
