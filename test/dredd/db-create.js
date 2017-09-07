const { Client } = require('pg');

const config = require('../../config/config');
const logger = require('../../logger').logger;

const client = new Client({
  user: config.username,
  host: config.host,
  password: config.password
});

client.connect();

client.query(`CREATE DATABASE "${config.testDb}"`, (err, res) => {
  if (err) {
    if (err.code === '42P04') logger.log('error', `${config.testDb} already exists.`);
    logger.log('error', err);
  }
  if (res) logger.log('info', `DB: ${config.testDb}, command: ${res.command}`);
  client.end();
  process.exit();
});
