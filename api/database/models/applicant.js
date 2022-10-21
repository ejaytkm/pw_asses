'use strict'

module.exports = (sequelize, DataTypes) => {
  const Applicant = sequelize.define('Applicant', {
    onfido_applicant_id: DataTypes.STRING,
    onfido_href: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    email: DataTypes.STRING,
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    dob: DataTypes.STRING,
    address_street: DataTypes.STRING,
    address_town: DataTypes.STRING,
    address_postcode: DataTypes.STRING,
    address_country: DataTypes.STRING,

    created_at: DataTypes.DATE(6),
    updated_at: DataTypes.DATE(6),
    deleted_at: DataTypes.DATE(6)
  }, {

    underscored: true,
    paranoid: true,
    tableName: 'applicants'
  })

  Applicant.associate = (models) => {
    Applicant.hasMany(models.Check, {
      foreignKey: 'applicant_id',
      as: 'checkData'
    })

    Applicant.hasMany(models.Document, {
      foreignKey: 'applicant_id',
      as: 'documentData'
    })

    Applicant.hasMany(models.LivePhoto, {
      foreignKey: 'applicant_id',
      as: 'livePhotoData'
    })
  }

  return Applicant
}
