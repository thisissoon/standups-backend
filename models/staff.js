'use strict';
module.exports = function(sequelize, DataTypes) {
  const Staff = sequelize.define('Staff', {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.STRING,
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