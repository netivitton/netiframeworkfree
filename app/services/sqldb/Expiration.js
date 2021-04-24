/**
 * Edit by Netivit on 28-10-2020.
 */
"use strict";

module.exports = function (sequelize, DataTypes) {
  var Expiration = sequelize.define(
    "Expiration",
    {
      id: {
        type: DataTypes.INTEGER(11),
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        unique: true,
      },
      code: DataTypes.STRING(255),
      expire: DataTypes.DATEONLY,
    },
    {
      tableName: "expiration", // oauth_users
      timestamps: false,
      underscored: true,
    }
  );

  return Expiration;
};
