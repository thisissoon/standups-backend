const Sequelize = require('sequelize');
const connectionConfig = require('../config/config.json');

const sequelize = new Sequelize(connectionConfig.development);

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = {
  sequelize
};