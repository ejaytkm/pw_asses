'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('livephotos', {
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

      live_photo_id: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
      },

      file_type: {
        type: Sequelize.STRING,
        allowNull: false
      },

      file_size: {
        type: Sequelize.STRING,
        allowNull: false
      },

      file_name: {
        type: Sequelize.STRING,
        allowNull: true
      },

      download_href: {
        type: Sequelize.STRING,
        allowNull: true
      },

      s3_download_href: {
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
    return queryInterface.dropTable('livephotos')
  }
}
