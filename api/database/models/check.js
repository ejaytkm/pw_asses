'use strict'

module.exports = (sequelize, DataTypes) => {
  const Check = sequelize.define('Check', {
    applicant_id: DataTypes.STRING,
    onfido_check_id: DataTypes.STRING,

    onfido_check_config: DataTypes.TEXT,
    status: DataTypes.STRING,
    result: DataTypes.STRING,

    onfido_result_uri: DataTypes.STRING,
    onfido_json_reponse: DataTypes.TEXT,

    created_at: DataTypes.DATE(6),
    updated_at: DataTypes.DATE(6),
    deleted_at: DataTypes.DATE(6)
  }, {

    underscored: true,
    paranoid: true,
    tableName: 'checks'
  })

  Check.associate = (models) => {
    Check.belongsTo(models.Applicant, {
      foreignKey: 'applicant_id',
      as: 'checkData'
    })

    Check.belongsTo(models.Applicant, {
      foreignKey: 'applicant_id',
      as: 'applicantData'
    })

    Check.hasMany(models.Report, {
      foreignKey: 'onfido_check_id',
      sourceKey: 'onfido_check_id',
      as: 'reportData'
    })
  }

  return Check
}
