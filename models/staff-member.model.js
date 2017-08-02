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
    allowNull: false
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  fullName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  role: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {
  tableName: 'StaffMember',
  hooks: {
    beforeValidate: (staffMember) => {
      const fullName = `${staffMember.dataValues.firstName} ${staffMember.dataValues.lastName}`;
      staffMember.fullName = fullName;
    }
  }
});

module.exports = {
  StaffMember
};