'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const IngredientOutlet = sequelize.define('IngredientOutlet', {
    ingredient_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Ingredient',
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
    value: DataTypes.STRING,
    json_value: {
      type: DataTypes.JSONB,
      get() {
        const rawValue = this.getDataValue('json_value');
        return JSON.stringify(rawValue);
      }
    },
    deleted_at: DataTypes.DATE(6),
    updated_at: DataTypes.DATE(6),
    created_at: DataTypes.DATE(6)
  }, {
  	underscored: true,
    paranoid: true,
    tableName: 'ingredient_outlets',
  })

  IngredientOutlet.associate = function (models) {
    IngredientOutlet.belongsTo(models.Ingredient, {
      foreignKey:'ingredient_id',
      as: 'ingredientData',
    });

    IngredientOutlet.belongsTo(models.Outlet, {
      foreignKey:'outlet_id',
      as: 'outletData',
    });
  }

  return IngredientOutlet
};