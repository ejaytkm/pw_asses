'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('user_types', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },

      code: {
        type: Sequelize.STRING,
        defaultValue: null
      },

      name: {
        type: Sequelize.STRING
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
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('ingredients');
  }
};