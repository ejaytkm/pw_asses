'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('reports', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },

      onfido_report_id: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
      },

      onfido_check_id: {
        type: Sequelize.STRING,
        allowNull: false
      },

      onfido_report_href: {
        type: Sequelize.STRING,
        allowNull: false
      },

      onfido_document: {
        type: Sequelize.TEXT,
        allowNull: true
      },

      report_name: {
        type: Sequelize.STRING,
        allowNull: false
      },

      report_status: {
        type: Sequelize.STRING,
        allowNull: true
      },

      report_result: {
        type: Sequelize.STRING,
        allowNull: true
      },

      report_sub_result: {
        type: Sequelize.STRING,
        allowNull: true
      },

      report_properties: {
        type: Sequelize.TEXT,
        allowNull: true
      },

      report_breakdown: {
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
    return queryInterface.dropTable('reports')
  }
}
