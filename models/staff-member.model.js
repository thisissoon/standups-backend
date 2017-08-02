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
    set(val) {
      this.setDataValue('firstName', val.toLowerCase());
    }
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
    set(val) {
      this.setDataValue('lastName', val.toLowerCase());
    }
  },
  fullName: {
    type: Sequelize.STRING,
    allowNull: false,
    set(val) {
      this.setDataValue('fullName', val.toLowerCase());
    }
  },
  role: {
    type: Sequelize.STRING,
    allowNull: false,
    set(val) {
      this.setDataValue('role', val.toLowerCase());
    }
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