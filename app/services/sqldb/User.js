/**
 * Edit by Netivit on 28-10-2020.
 */
'use strict';

module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER(11),
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    username: DataTypes.STRING(32),
    password: DataTypes.STRING(100),
    scope: DataTypes.STRING,
    salt: DataTypes.STRING(100)
  }, {
    tableName: 'users', // oauth_users
    timestamps: false,
    underscored: true

  });

  return User;
}

