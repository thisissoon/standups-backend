const Sequelize = require('sequelize');
const sequelize = require('../db/db.config.js').sequelize;

const StaffMember = sequelize.define('StaffMember', {
  ID: {
    primaryKey: true,
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV1
  },
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: 'fullName'
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: 'fullName'
  },
  role: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {
  tableName: 'StaffMember'
});

module.exports = {
  StaffMember
};