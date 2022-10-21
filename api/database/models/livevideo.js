'use strict'

module.exports = (sequelize, DataTypes) => {
  const LiveVideo = sequelize.define('LiveVideo', {
    applicant_id: DataTypes.BIGINT,
    live_video_id: DataTypes.STRING,

    challenge: DataTypes.TEXT,
    language: DataTypes.TEXT,

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
    tableName: 'livevideos'
  })

  // Document.associate = (models) => {
  //   Document.belongsTo(models.User, {
  //     foreignKey: 'user_id',
  //     as: 'user'
  //     // onDelete: 'CASCADE',
  //   })
  // }

  return LiveVideo
}
