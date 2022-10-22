'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('user_outlets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },

      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'OAuthUsers',
          key: 'id',
          as: 'user_id'
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
    }).then(() => queryInterface.addIndex('user_outlets', [
      'user_id',
      'outlet_id'
    ]));
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('user_outlets');
  }
};