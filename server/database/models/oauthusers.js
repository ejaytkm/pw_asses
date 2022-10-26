'use strict';
const bcrypt = require('bcrypt-nodejs');
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class OAuthUsers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      OAuthUsers.hasOne(models.OAuthTokens, {
        foreignKey: 'userId',
        as: 'token',
      });
    }
  };

  OAuthUsers.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    name: DataTypes.STRING,
    user_type_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'OAuthUsers',
  });

  OAuthUsers.beforeSave((user) => {
    if (user.changed('password')) {
      user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
    }
  });

  OAuthUsers.associate = function (models) {
    OAuthUsers.hasMany(models.UserOutlet, {
      foreignKey: 'user_id',
      as: 'userData',
    })
  }

  return OAuthUsers;
};