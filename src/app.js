require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const routes = require('./frameworks/expressSpecif/routes');
const API_PREFIX = process.env.API_PREFIX || '/api/v1';
const dependencies = require('./config/dependencies');
const errorHandler = require('./frameworks/expressSpecif/ErrorHandler');
const { connect: connectToMongo } = require('./frameworks/database/mongo');

module.exports = {
  start: () => {
    console.clear();
    app.listen(PORT, () => {
      // Middlewares
      app.use(express.json());
      app.use(express.urlencoded({
        extended: true
      }))

      // Routes
      app.use(API_PREFIX, routes(dependencies));
      //Common Error Handler
      app.use(errorHandler);

      console.log(`Server running on port ${PORT}`);

      connectToMongo();
    })
  }
}