const config = {
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.TEST_DB_NAME || process.env.DB_NAME || 'stand-ups-test',
  host: process.env.DB_HOST || '127.0.0.1',
  dialect: 'postgres',
  logging: process.env.DB_LOGGING || false,
  loggerLevel: process.env.LOGGER_LEVEL || 'info',
  serverPort: process.env.SERVER_PORT || 3000,
  testDb: process.env.TEST_DB_NAME || 'stand-ups-test',
  root: process.env.ROOT || '',
  corsOrigin: process.env.CORS_ORIGIN || '*'
};

module.exports = config;