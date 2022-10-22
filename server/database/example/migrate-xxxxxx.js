'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('roles_permissions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },

      role_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'roles',
          key: 'id',
          as: 'role_id'
        },
        allowNull: false
      },

      permission_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'permissions',
          key: 'id',
          as: 'permission_id'
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
    }).then(() => queryInterface.addIndex('roles_permissions', [
      'role_id',
      'permission_id',
      'deleted_at',
      'updated_at',
      'created_at'
    ]))
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('roles_permissions')
  }
}
