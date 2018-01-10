const mongoose = require('mongoose');
const Promise = require('bluebird');
const util = require('util');
const config = require('./config');

const debug = require('debug')('express-yourself:db');

mongoose.Promise = Promise;

const mongoUri = config.mongo.host;
const mongoOptions = {
  keepAlive: 1,
};

mongoose.connect(mongoUri, mongoOptions);
mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${mongoUri}`);
});

mongoose.set('debug', (collectionName, method, query, doc) => {
  debug(`${collectionName}.${method}`, util.inspect(query, false, 20), doc);
});
