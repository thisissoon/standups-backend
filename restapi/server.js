const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

const config = require('../config/config');
const routes = require('./routes');
const errors = require('./errors');
const ValidationError = require('sequelize/lib/errors').ValidationError;

class Server {

  constructor(port) {
    // Configure
    this.port = port || 5000;

    // Initialise
    this.app = express();
    this.init();
  }

  init() {
    // Express settings
    this.app.settings['x-powered-by'] = false;

    // Global middleware
    this.app.use(bodyParser.json());
    this.app.use(logger('dev'));

    // // Setup routes
    this.app.use(config.root, routes);

    // Error handling
    this.app.use(this.error);

  }

  run() {
    this.app.listen(this.port, function () {
      const addr = this.address();
      console.log(`Server listening on ${addr.address}:${addr.port}`);
    });
  }

  /**
   * Handle server errors, respond with HAL representation
   *
   * @method error
   * @param {Error}    err  Error thrown in request chain
   * @param {Object}   req  Express Request
   * @param {Object}   res  Express Response
   * @param {Function} next Callback to continue middleware chain
   */
  error(err, req, res, next) {
    if (err instanceof ValidationError) err.status = 422;
    res.status(err && err.status ? err.status : 500)
      .json(new errors.HalErrors(req, err));
  }

}
module.exports = Server;
