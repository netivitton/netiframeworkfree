/**
 * Edit by Netivit on 28-10-2020.
 */
'use strict';

module.exports = function AuthCodeModel(sequelize, DataTypes) {
  const OAuthAuthorizationCode = sequelize.define('OAuthAuthorizationCode', {
    id: {
      type: DataTypes.INTEGER(14),
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    authorization_code : DataTypes.STRING(256),
    expires: DataTypes.DATE,
    redirect_uri: DataTypes.STRING(2000),
    scope: DataTypes.STRING
  }, {
    tableName: 'oauth_authorization_codes',
    timestamps: false,
    underscored: true
  });

  return OAuthAuthorizationCode;
};
