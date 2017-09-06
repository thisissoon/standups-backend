function getConfig(NODE_ENV) {
  switch (NODE_ENV) {
    case 'test':
      return {
        username: 'postgres',
        password: 'postgres',
        database: 'stand-ups-test',
        host: '127.0.0.1',
        dialect: 'postgres',
        logging: false,
        loggerLevel: 'info',
        parseData: 'test',
        serverPort: 3000
      };
    case 'dev':
      return {
        username: 'postgres',
        password: 'postgres',
        database: 'stand-ups-dev',
        host: '127.0.0.1',
        dialect: 'postgres',
        logging: false,
        loggerLevel: 'info',
        parseData: 'development',
        serverPort: 3000
      };
    case 'prod':
      return {
        username: 'postgres',
        password: 'postgres',
        database: 'stand-ups-prod',
        host: '127.0.0.1',
        dialect: 'postgres',
        logging: false,
        loggerLevel: 'info',
        parseData: 'production',
        serverPort: 3000
      };
    default:
      return {
        username: process.env.DB_USERNAME || 'postgres',
        password: process.env.DB_PASSWORD || 'postgres',
        database: process.env.DB_NAME || 'stand-ups-test',
        host: process.env.DB_HOST || '127.0.0.1',
        dialect: 'postgres',
        logging: process.env.DB_LOGGING || false,
        loggerLevel: process.env.LOGGER_LEVEL || 'info',
        parseData: process.env.PARSE_DATA || 'test',
        serverPort: process.env.SERVER_PORT || 3000
      };
  }
}

module.exports = getConfig(process.env.NODE_ENV);