'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
    'summaries',
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
            model: 'staff'
          }
        },
        day_id: {
          type: Sequelize.UUID,
          allowNull: false, 
          references: {
            model: 'days'
          }
        }
      }
    );
  },
  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('summaries');
  }
};
