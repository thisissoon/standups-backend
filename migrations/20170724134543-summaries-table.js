'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
    'Summaries',
      {
        id: {
          primaryKey: true,
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV1
        },
        order: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        staff_id: {
          type: Sequelize.UUID,
          allowNull: false,
          references: {
            model: 'Staff'
          }
        },
        day_id: {
          type: Sequelize.UUID,
          allowNull: false, 
          references: {
            model: 'Days'
          }
        }
      }
    );
  },
  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('Summaries');
  }
};
