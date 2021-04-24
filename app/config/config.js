/**
 * Edit by Netivit on 28-10-2020.
 */
if (process.env.NODE_ENV == "development") {
  console.log("In DEV mode...");
  require("dotenv").config({ path: "./.env.development" });
  console.log("DB_HOST is: ", "In DEV mode...");
} else {
  console.log("In PROD mode...");
  require("dotenv").config({ path: "./.env.production" });
  console.log("DB_HOST is: ", "In PROD mode...");
}
module.exports = {
  sql: {
    waitForConnections: true,
    queueLimit: 0,
    dialect: "mysql",
    connectionLimit: 1000,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    charset: "utf8mb4",
    port: process.env.DB_PORT,
    timezone: "+07:00",
  },
  sqlTemp: {
    waitForConnections: true,
    queueLimit: 0,
    dialect: "mysql",
    connectionLimit: 1000,
    host: process.env.DB_HOST_TEMP,
    user: process.env.DB_USER_TEMP,
    password: process.env.DB_PASSWORD_TEMP,
    database: process.env.DB_DATABASE_TEMP,
    charset: "utf8mb4",
    port: process.env.DB_PORT_TEMP,
    timezone: "+07:00",
  },
  mongo: {
    uri: "",
  },
  seedDB: false,
  seedMongoDB: false,
  seedDBForce: true,
  db: "sql", // mongo,sql if you want to use any SQL change dialect above in sql config
  url_base: "http://localhost:4200/",
};
