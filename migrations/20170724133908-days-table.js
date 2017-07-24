'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
    'days',
      {
        id: {
          primaryKey: true,
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV1
        },
        date: {
          type: Sequelize.DATE,
          allowNull: false
        }
      }
    );
  },
  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('days');
  }
};
