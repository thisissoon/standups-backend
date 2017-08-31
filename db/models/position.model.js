const Sequelize = require('sequelize');
const sequelize = require('../connection').sequelize;

const Position = sequelize.define('Position', {
  ID: {
    primaryKey: true,
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV1
  },
  placeIndex: {
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
  tableName: 'Position'
});

module.exports = {
  Position
};