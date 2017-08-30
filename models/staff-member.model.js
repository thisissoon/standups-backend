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
  role: {
    type: Sequelize.STRING,
    allowNull: false,
    set(val) {
      this.setDataValue('role', val.toLowerCase());
    }
  }
}, 
  {
    tableName: 'StaffMember',
    getterMethods: {
      fullName: function () {
        var string = this.firstName + ' ' + this.lastName;
        return string;
      }
    }
  }
);

module.exports = {
  StaffMember
};