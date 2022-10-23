'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const UserOutlet = sequelize.define('UserOutlet', {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'OAuthUsers',
        key: 'id'
      }
    },
    outlet_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Outlets',
        key: 'id'
      }
    },

    deleted_at: DataTypes.DATE(6),
    updated_at: DataTypes.DATE(6),
    created_at: DataTypes.DATE(6)
  }, {
  	underscored: true,
    paranoid: true,
    tableName: 'user_outlets',
  })

  UserOutlet.associate = function (models) {
    UserOutlet.belongsTo(models.OAuthUsers, {
      foreignKey:'user_id',
      as: 'userData',
    });

    UserOutlet.belongsTo(models.Outlet, {
      foreignKey:'outlet_id',
      as: 'outletData',
    });
  }

  return UserOutlet
};