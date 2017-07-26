const Sequelize = require('sequelize');
const sequelize = require('../db/db.config.js').sequelize;

const Summary = sequelize.define('Summary', {
  ID: {
    primaryKey: true,
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV1
  },
  orderIndex: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  staffID: {
    type: Sequelize.UUID,
    allowNull: false,
    references: {
      model: 'StaffMember',
      key: 'ID'
    }
  },
  dayID: {
    type: Sequelize.UUID,
    allowNull: false, 
    references: {
      model: 'Day',
      key: 'ID'
    }
  }
}, {
  tableName: 'Summary'
});

module.exports = {
  Summary
};