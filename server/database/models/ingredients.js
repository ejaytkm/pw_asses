'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Ingredients = sequelize.define('Ingredients', {
    name: DataTypes.STRING,

    deleted_at: DataTypes.DATE(6),
    updated_at: DataTypes.DATE(6),
    created_at: DataTypes.DATE(6)
  }, {
  	underscored: true,
    paranoid: true,
    tableName: 'ingredients'
  })

  Ingredients.associate = function (models) {
  }

  return Ingredients
};