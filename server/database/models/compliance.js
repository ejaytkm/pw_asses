'use strict'

module.exports = (sequelize, DataTypes) => {
  const Compliance = sequelize.define('Compliance', {
    onfido_check_id: DataTypes.STRING,
    compliance_json_response: DataTypes.TEXT,

    created_at: DataTypes.DATE(6),
    updated_at: DataTypes.DATE(6),
    deleted_at: DataTypes.DATE(6)
  }, {

    underscored: true,
    paranoid: true,
    tableName: 'compliance'
  })

  return Compliance
}
