const config = require('../config/development.json').logger;

const Logger = require('logger').Logger;
const logger = new Logger();
logger.debugLevel = config.level;

module.exports.logger = logger;