const config = require('../config/config.json')[process.env.MODE || 'dev'];

const Logger = require('logger').Logger;
const logger = new Logger();
logger.debugLevel = config.loggerLevel;

module.exports.logger = logger;