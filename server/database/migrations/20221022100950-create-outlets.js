'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('outlets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },

      name: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.TEXT
      },
      coordinate_x: {
        type: Sequelize.STRING
      },
      coordinate_y: {
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
    await queryInterface.dropTable('outlets');
  }
};