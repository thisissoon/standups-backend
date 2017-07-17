const Sequelize = require('sequelize');

const connection = new Sequelize('sequelize_demo', 'jackmatthews', 'password', {
  host: 'localhost',
  dialect: 'postgres'
});

connection
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

exports.connection = connection;