const { Client } = require('pg');

const config = require('../config/config');
const logger = require('./../logger').logger;

if (config.database === 'stand-ups-prod') {
  logger.log('error', 'you just tried to recreate the production database! Be careful with your environment variables!');
  process.exit(1);
}

const client = new Client({
  user: config.username,
  host: config.host,
  password: config.password
});

client.connect();

client.query(`CREATE DATABASE "${config.database}"`, (err, res) => {
  if (err) {
    if (err.code === '42P04') logger.log('error', `${config.database} already exists.`);
    logger.log('error', err);
  }
  if (res) logger.log('info', `DB: ${config.database}, command: ${res.command}`);
  client.end();
  process.exit();
});
