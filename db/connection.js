const Sequelize = require('sequelize');
const connectionConfig = require('../config/db.json')[process.env.MODE || 'dev'];

const sequelize = new Sequelize(connectionConfig);

sequelize
  .authenticate()
  .then(() => {
    console.log(`Connection to ${connectionConfig.database} has been established successfully.`);
  })
  .catch(err => {
    console.error(`Unable to connect to ${connectionConfig.database}:`, err);
  });

module.exports = {
  sequelize
};