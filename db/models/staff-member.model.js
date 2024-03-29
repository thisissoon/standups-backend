const Sequelize = require('sequelize');
const sequelize = require('../connection').sequelize;

const StaffMember = sequelize.define('StaffMember', {
  ID: {
    primaryKey: true,
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV1
  },
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    },
    set(val) {
      this.setDataValue('firstName', val.toLowerCase());
    }
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    },
    set(val) {
      this.setDataValue('lastName', val.toLowerCase());
    }
  },
  role: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    },
    set(val) {
      this.setDataValue('role', val.toLowerCase());
    }
  },
  current: {
    type: Sequelize.BOOLEAN,
    allowNull: false
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