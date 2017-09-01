'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
    'Summary',
      {
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
      queryInterface.addConstraint('Summary', ['staffID', 'dayID'], {
        type: 'unique',
        name: 'summaries_per_staff_member_per_day'
      });
    });
  },
  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('Summary');
  }
};
