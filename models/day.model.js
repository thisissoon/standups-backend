const Sequelize = require('sequelize');
const sequelize = require('../db/db.config.js').sequelize;

const Day = sequelize.define('Day', {
  ID: {
    primaryKey: true,
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV1
  },
  date: {
    type: Sequelize.DATE,
    allowNull: false
  }
}, {
  tableName: 'Day'
});

module.exports = Day;