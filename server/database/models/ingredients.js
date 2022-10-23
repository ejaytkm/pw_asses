'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Ingredient = sequelize.define('Ingredient', {
    name: DataTypes.STRING,

    deleted_at: DataTypes.DATE(6),
    updated_at: DataTypes.DATE(6),
    created_at: DataTypes.DATE(6)
  }, {
  	underscored: true,
    paranoid: true,
    tableName: 'ingredients'
  })

  Ingredient.associate = function (models) {
    Ingredient.hasMany(models.IngredientOutlet, {
      foreignKey: 'ingredient_id',
      as: 'ingredientData',
    })
  }

  return Ingredient
};