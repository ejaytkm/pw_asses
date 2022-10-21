module.exports = (sequelize, DataTypes) => {
  const Document = sequelize.define('Document', {
    applicant_id: DataTypes.BIGINT,
    document_id: DataTypes.STRING,

    document_type: DataTypes.STRING,
    file_type: DataTypes.STRING,
    file_size: DataTypes.STRING,
    file_name: DataTypes.STRING,
    file_side: DataTypes.STRING,

    download_href: DataTypes.STRING,
    s3_download_href: DataTypes.STRING,
    onfido_json_reponse: DataTypes.TEXT,

    created_at: DataTypes.DATE(6),
    updated_at: DataTypes.DATE(6),
    deleted_at: DataTypes.DATE(6)
  }, {

    underscored: true,
    paranoid: true,
    tableName: 'documents'
  })

  Document.associate = (models) => {
    Document.belongsTo(models.Applicant, {
      foreignKey: 'applicant_id',
      as: 'applicant'
    })
  }

  return Document
}
