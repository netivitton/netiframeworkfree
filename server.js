const express = require("express");
const app = express();
var oauthServer = require("oauth2-server");
const helmet = require("helmet");
const xXssProtection = require("x-xss-protection");
var routes = require("./app/routes/index");
var users = require("./app/routes/users");
var Request = oauthServer.Request;
var Response = oauthServer.Response;
const path = require('path')
const { I18n } = require('i18n')

const i18n = new I18n({
  locales: ['en', 'th'],
  directory: path.join(__dirname, 'locales'),
  defaultLocale: 'en',
  header: 'accept-language',
  queryParameter: 'lang',
  autoReload: true,
  register: global,
})
var fs = require("fs");
var crypto = require("crypto");
var dbconnectTemp = require("./app/services/dbconnect").connectionTemp;
var Sequelize = require("sequelize");
const Op = Sequelize.Op;
var sqldb = require("./app/services/sqldb");
var Expiration = sqldb.Expiration;

var authenticate = require("./app/services/authenticate");

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

// https://github.com/manjeshpv/node-oauth2-server-implementation/blob/master/components/oauth/models.js
var oauth = new oauthServer({
  model: require("./app/services/oauth_model.js"),
});

app.use(function (req, res, next) {
  res.setHeader("X-XSS-Protection", "1; mode=block");
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

app.use(helmet());
app.use(xXssProtection());
app.use("/", express.static("./app/"));
app.use("/", routes);

app.all("/oauth/token", async function (req, res, next) {
  var request = new Request(req);
  var response = new Response(res);

  var hashsalt = crypto
    .createHash(process.env.ALGORITHM_CRYTO)
    .update(process.env.PASSWORD)
    .digest("hex");

  let expiration = await Expiration.findOne({
    where: {
      code: hashsalt,
      expire: {
        [Op.gte]: Sequelize.fn("NOW"),
      },
    },
    attributes: ["id", "expire"],
  });

  if (expiration === null) {
    return res.status(500);
  } else {
    oauth
      .token(request, response)
      .then(function (token) {
        // Todo: remove unnecessary values in response
        return res.json(token);
      })
      .catch(function (err) {
        return res.status(500).json(err);
      });
  }
});

app.post("/authorise", function (req, res) {
  var request = new Request(req);
  var response = new Response(res);

  return oauth
    .authorize(request, response)
    .then(function (success) {
      res.json(success);
    })
    .catch(function (err) {
      res.status(err.code || 500).json(err);
    });
});
app.use(i18n.init);
app.use("/user", authenticate());
app.use("/user", users);
app.use(function (req, res, next) {
  res.end("Error not found");
});
start_server();

async function start_server() {
  var port = 4200;

  var hashsalt = crypto
    .createHash(process.env.ALGORITHM_CRYTO)
    .update(process.env.PASSWORD)
    .digest("hex");

  let expiration = await Expiration.findOne({
    where: {
      code: hashsalt,
      expire: {
        [Op.gte]: Sequelize.fn("NOW"),
      },
    },
    attributes: ["id", "expire"],
  });

  if (expiration === null) {
    console.log("Let Error Server V8.");
  } else {
    app.listen(port, function () {
      console.log("Let Start Server V8.");
    });
  }
}
