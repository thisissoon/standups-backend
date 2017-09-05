const Sequelize = require('sequelize');
const config = require('../config/config');

const sequelize = new Sequelize(config);

sequelize
  .authenticate()
  .then(() => {
    console.log(`Connection to ${config.database} has been established successfully.`);
  })
  .catch(err => {
    console.error(`Unable to connect to ${config.database}:`, err);
  });

module.exports = {
  sequelize
};