
var config = require('./../config/config')
var sql = config.sql;
var sqlTemp = config.sqlTemp;
var databaseOptions = {
    waitForConnections: sql.waitForConnections,
    queueLimit: sql.queueLimit,
    connectionLimit : sql.connectionLimit,
    host: sql.host,
    user: sql.user,
    password: sql.password,
    database: sql.database,
    charset: sql.charset,
    port: sql.port
};

var databaseLockOptions = {
    waitForConnections: sqlTemp.waitForConnections,
    queueLimit: sqlTemp.queueLimit,
    connectionLimit : sqlTemp.connectionLimit,
    host: sqlTemp.host,
    user: sqlTemp.user,
    password: sqlTemp.password,
    database: sqlTemp.database,
    charset: sqlTemp.charset,
    port: sqlTemp.port
};
module.exports = { databaseOptions: databaseOptions,databaseLockOptions: databaseLockOptions };