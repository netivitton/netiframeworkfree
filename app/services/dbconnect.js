var mysql = require("mysql2/promise");
var config = require("./../services/config_db");
const connection = mysql.createPool(config.databaseOptions);
const connectionTemp = mysql.createPool(config.databaseLockOptions);

module.exports = {
  connection: connection,
  connectionTemp: connectionTemp,
};
