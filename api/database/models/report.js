'use strict'

module.exports = (sequelize, DataTypes) => {
  const Report = sequelize.define('Report', {
    onfido_report_id: DataTypes.STRING,
    onfido_check_id: DataTypes.STRING,
    onfido_report_href: DataTypes.STRING,
    onfido_document: DataTypes.TEXT,

    report_name: DataTypes.STRING,
    report_status: DataTypes.STRING,
    report_result: DataTypes.STRING,
    report_sub_result: DataTypes.STRING,

    report_properties: DataTypes.TEXT,
    report_breakdown: DataTypes.TEXT,

    created_at: DataTypes.DATE(6),
    updated_at: DataTypes.DATE(6),
    deleted_at: DataTypes.DATE(6)
  }, {

    underscored: true,
    paranoid: true,
    tableName: 'reports'
  })

  Report.associate = (models) => {
    Report.belongsTo(models.Check, {
      foreignKey: 'onfido_check_id',
      targetKey: 'onfido_check_id'
    })
  }

  return Report
}
