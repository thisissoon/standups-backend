'use strict';
module.exports = function(sequelize, DataTypes) {
  const Staff = sequelize.define('Staff', {
    ID: {
      primaryKey: true,
      type: DataTypes.UUID
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    classMethods: {
      associate: function(models) {
        Staff.hasMany(models.Summary);
        Staff.hasMany(models.Position);
      }
    },
    timestamps: false,
    tableName: 'Staff'
  });
  return Staff;
};