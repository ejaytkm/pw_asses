'use strict'

module.exports = (sequelize, DataTypes) => {
  const LivePhoto = sequelize.define('LivePhoto', {
    applicant_id: DataTypes.BIGINT,
    live_photo_id: DataTypes.STRING,

    file_type: DataTypes.STRING,
    file_size: DataTypes.STRING,
    file_name: DataTypes.STRING,

    download_href: DataTypes.STRING,
    s3_download_href: DataTypes.STRING,
    onfido_json_reponse: DataTypes.TEXT,

    created_at: DataTypes.DATE(6),
    updated_at: DataTypes.DATE(6),
    deleted_at: DataTypes.DATE(6)
  }, {

    underscored: true,
    paranoid: true,
    tableName: 'livephotos'
  })

  LivePhoto.associate = (models) => {
    LivePhoto.belongsTo(models.Applicant, {
      foreignKey: 'applicant_id',
      as: 'applicant'
    })
  }

  return LivePhoto
}
