'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('checks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },

      applicant_id: {
        type: Sequelize.BIGINT,
        references: {
          model: 'applicants',
          key: 'id',
          as: 'applicant_id'
        },
        allowNull: false
      },

      onfido_check_config: {
        type: Sequelize.TEXT,
        allowNull: false
      },

      onfido_check_id: {
        type: Sequelize.STRING,
        allowNull: false
      },

      status: {
        type: Sequelize.STRING,
        allowNull: false
      },

      result: {
        type: Sequelize.STRING,
        allowNull: true
      },

      onfido_result_uri: {
        type: Sequelize.STRING,
        allowNull: true
      },

      onfido_json_reponse: {
        type: Sequelize.TEXT,
        allowNull: true
      },

      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },

      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      },

      deleted_at: {
        allowNull: true,
        type: Sequelize.DATE
      }
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('checks')
  }
}
