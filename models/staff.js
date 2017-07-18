const Sequelize = require('sequelize');
const connection = require('../db/config').connection;

const Staff = connection.define('staff', {
  id: {
    primaryKey: true,
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV1
  },
  first_name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  last_name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  role: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {
  hooks: {
    beforeValidate: () => {
      console.log('beforeValidate');
    },
    afterValidate: () => {  
      console.log('afterValidate');
    },
    beforeCreate: () => {
      console.log('beforeCreate');
    },
    afterCreate: (res) => {
      console.log('created staff with name:', res.dataValues.first_name);
    }
  }
});

exports.Staff = Staff;