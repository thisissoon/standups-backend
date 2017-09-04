const { Client } = require('pg');

const config = require('../config/db')[process.env.MODE || 'dev'];
const logger = require('./../logger').logger;

const client = new Client();

function dropIfExistAsPromise(client, database) {
  return new Promise((resolve, reject) => {
    client.query(`DROP DATABASE IF EXISTS "${database}"`, (err, res) => {
      if (err) reject(err);
      if (res) resolve(res);
    });
  });
}

function createAsPromise(client, database) {
  return new Promise((resolve, reject) => {
    client.query(`CREATE DATABASE "${database}"`, (err, res) => {
      if (err) reject(err);
      if (res) resolve(res);
    });
  });
}

client.connect();

dropIfExistAsPromise(client, config.database)
  .then(res => {
    logger.log('info', `DB: ${config.database}, command: ${res.command}`);
    return createAsPromise(client, config.database);
  })
  .then(res => {
    logger.log('info', `DB: ${config.database}, command: ${res.command}`);
    client.end();
    process.exit();
  })
  .catch(err => {
    logger.log('error', err);
    client.end(); 
    process.exit();
  });