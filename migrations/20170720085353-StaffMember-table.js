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
    );
  },
  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('StaffMember');
  }
};
