const Sequelize = require('sequelize');
const config = require('../config/config');

const sequelize = new Sequelize(config);

function connect(counter) {
  sequelize
  .authenticate()
  .then(() => {
    console.log(`Connection to ${config.database} has been established successfully.`);
  })
  .catch(err => {
    console.error(`Unable to connect to ${config.database}:`, err.original);
    console.log('attempt: ', counter);
    if (counter < 5) {
      console.log('re-trying');
      setTimeout(() => {
        connect(++counter);
      }, 5000);
    } else {
      console.log('maximum re-trys exceeded');
    }
  });
  module.exports = {
    sequelize
  };
}

connect(1);