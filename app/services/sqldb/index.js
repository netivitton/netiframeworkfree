/**
 * Edit by Netivit on 28-10-2020.
 */

/** https://github.com/dsquier/oauth2-server-php-mysql **/
var config = require('./../../config/config');
var Sequelize = require('sequelize');
const path = require('path');

var db = {
  sequelize: new Sequelize(
    config.sql.database,
    config.sql.user,
    config.sql.password,
    config.sql
  ),
  sequelizeTemp: new Sequelize(
    config.sqlTemp.database,
    config.sqlTemp.user,
    config.sqlTemp.password,
    config.sqlTemp
  )
};

let OAuthAccessToken = require(path.join(__dirname, "./OAuthAccessToken"))(db.sequelize, Sequelize);
let OAuthAuthorizationCode = require(path.join(__dirname, "./OAuthAuthorizationCode"))(db.sequelize, Sequelize);
let OAuthClient = require(path.join(__dirname, "./OAuthClient"))(db.sequelize, Sequelize);
let OAuthRefreshToken = require(path.join(__dirname, "./OAuthRefreshToken"))(db.sequelize, Sequelize);
let OAuthScope = require(path.join(__dirname, "./OAuthScope"))(db.sequelize, Sequelize);
let User = require(path.join(__dirname, "./User"))(db.sequelize, Sequelize);
let Thing = require(path.join(__dirname, "./Thing"))(db.sequelize, Sequelize);
let Expiration = require(path.join(__dirname, "./Expiration"))(db.sequelizeTemp, Sequelize);


//OAuthAccessToken
OAuthAccessToken.belongsTo(User, {
  foreignKey: 'user_id',
});

OAuthAccessToken.belongsTo(OAuthClient, {
  foreignKey: 'client_id',
});

//OAuthAuthorizationCode
OAuthAuthorizationCode.belongsTo(OAuthClient, {
  foreignKey: 'client_id',
})

OAuthAuthorizationCode.belongsTo(User, {
  foreignKey: 'user_id',
})

//OAuthClient
OAuthClient.belongsTo(User, {
  foreignKey: 'user_id',
})

//OAuthRefreshToken
OAuthRefreshToken.belongsTo(OAuthClient, {
  foreignKey: 'client_id',
})

OAuthRefreshToken.belongsTo(User, {
  foreignKey: 'user_id',
})



db.OAuthAccessToken = OAuthAccessToken;
db.OAuthAuthorizationCode = OAuthAuthorizationCode;
db.OAuthClient = OAuthClient;
db.OAuthRefreshToken = OAuthRefreshToken;
db.OAuthScope = OAuthScope;
db.User = User;
db.Thing = Thing;
db.Expiration = Expiration;

Object.keys(db).forEach(function (modelName) {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});

module.exports = db;