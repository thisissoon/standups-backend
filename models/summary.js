'use strict';
module.exports = function(sequelize, DataTypes) {
  const Summary = sequelize.define('Summary', {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    staff_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Staff'
      }
    },
    day_id: {
      type: DataTypes.UUID,
      allowNull: false, 
      references: {
        model: 'Day'
      }
    }
  }, {
    classMethods: {
      associate: function(models) {

      }
    },
    timestamps: false,
    freezeTableName: true
  });
  return Summary;
};