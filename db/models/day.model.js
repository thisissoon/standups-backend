const Sequelize = require('sequelize');
const sequelize = require('../connection').sequelize;

const Day = sequelize.define('Day', {
  ID: {
    primaryKey: true,
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV1
  },
  date: {
    type: Sequelize.DATEONLY,
    allowNull: false,
    notEmpty: true
  }
}, {
  tableName: 'Day'
});

module.exports = Day;