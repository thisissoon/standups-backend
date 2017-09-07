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
        serverPort: 3000,
        testDb: 'stand-ups-test'
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
        parseOutput: 'development',
        serverPort: 3000,
        testDb: 'stand-ups-test'
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
        parseOutput: 'production',
        serverPort: 3000,
        testDb: 'stand-ups-test'
      };
    default:
      return {
        username: process.env.DB_USERNAME || 'postgres',
        password: process.env.DB_PASSWORD || 'postgres',
        database: process.env.DB_NAME || 'stand-ups-dev',
        host: process.env.DB_HOST || '127.0.0.1',
        dialect: 'postgres',
        logging: process.env.DB_LOGGING || false,
        loggerLevel: process.env.LOGGER_LEVEL || 'info',
        parseOutput: process.env.PARSE_DATA || 'development',
        serverPort: process.env.SERVER_PORT || 3000,
        testDb: process.env.TEST_DB_NAME || 'stand-ups-test'
      };
  }
}

module.exports = getConfig(process.env.NODE_ENV);