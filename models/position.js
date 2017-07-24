'use strict';
module.exports = function(sequelize, DataTypes) {
  const Position = sequelize.define('Position', {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1
    },
    place_index: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    staff_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'staff'
      }
    },
    day_id: {
      type: DataTypes.UUID,
      allowNull: false, 
      references: {
        model: 'days'
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
  return Position;
};