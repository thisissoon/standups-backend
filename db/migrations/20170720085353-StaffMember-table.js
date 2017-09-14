'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
    'StaffMember',
      {
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
          }
        },
        lastName: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
            notEmpty: true
          }
        },
        role: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
            notEmpty: true
          }
        },
        current: {
          type: Sequelize.BOOLEAN,
          allowNull: false
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.NOW
        }
      }
    ).then(() => {
      queryInterface.addConstraint('StaffMember', ['firstName', 'lastName'], {
        type: 'unique',
        name: 'full_name'
      });
    });
  },
  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('StaffMember');
  }
};
