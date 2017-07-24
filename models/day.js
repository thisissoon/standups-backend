'use strict';
module.exports = function(sequelize, DataTypes) {
  const Day = sequelize.define('Day', {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    classMethods: {
      associate: function(models) {
        Day.hasMany(models.Summary);
        Day.hasMany(models.Position);
      }
    },
    timestamps: false,
    tableName: 'Days'
  });
  return Day;
};