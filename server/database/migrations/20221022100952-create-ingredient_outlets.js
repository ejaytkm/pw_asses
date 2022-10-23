'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ingredient_outlets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },

      ingredient_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'ingredients',
          key: 'id',
          as: 'ingredient_id'
        },
        allowNull: false
      },

      outlet_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'outlets',
          key: 'id',
          as: 'outlet_id'
        },
        allowNull: false
      },

      value: {
        type: Sequelize.TEXT
      },

      json_value: {
        type: Sequelize.JSONB
      },

      deleted_at: {
        type: Sequelize.DATE(6),
        allowNull: true,
        defaultValue: null
      },

      created_at: {
        type: Sequelize.DATE(6),
        allowNull: true,
        defaultValue: Sequelize.fn('NOW')
      },

      updated_at: {
        type: Sequelize.DATE(6),
        allowNull: true,
        defaultValue: null
      }
    }).then(() => queryInterface.addIndex('ingredient_outlets', [
      'ingredient_id',
      'outlet_id'
    ]));
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('ingredient_outlets');
  }
};