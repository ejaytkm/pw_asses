'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Outlets = sequelize.define('Outlets', {
    name: DataTypes.STRING,

    address: DataTypes.TEXT,

    coordinate_x: DataTypes.STRING,
    coordinate_y: DataTypes.STRING,

    deleted_at: DataTypes.DATE(6),
    updated_at: DataTypes.DATE(6),
    created_at: DataTypes.DATE(6)
  }, {
  	underscored: true,
    paranoid: true,
    tableName: 'outlets'
  })

  Outlets.associate = function (models) {
  }

  return Outlets
};