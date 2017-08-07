const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const routes = require('./routes');

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

    // Setup routes
    this.app.use('', routes);

  }

  run() {
    this.app.listen(this.port, function () {
      const addr = this.address();
      console.log(`Server listening on ${addr.address}:${addr.port}`);
    });
  }
}
module.exports = Server;
