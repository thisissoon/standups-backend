const Logger = require('logger').Logger;
const logger = new Logger();
logger.debugLevel = 'success';

module.exports.logger = logger;