const { Client } = require('pg');

const config = require('../../config/config');
const logger = require('../../logger').logger;

const client = new Client({
  user: config.username,
  host: config.host,
  password: config.password
});

client.connect();

client.query(`DROP DATABASE IF EXISTS "${config.testDb}"`, (err, res) => {
  if (err) logger.log('error', err);
  if (res) logger.log('info', `DB: ${config.testDb}, command: ${res.command}`);
  client.end();
  process.exit();
});