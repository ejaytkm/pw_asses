'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('OAuthUsers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },

      username: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },

      user_type_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'user_types',
          key: 'id',
          as: 'user_type_id'
        },
        allowNull: true
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },

      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }).then(() => queryInterface.addIndex('OAuthUsers', [
      'user_type_id',
    ]));
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('OAuthUsers');
  }
};