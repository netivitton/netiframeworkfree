var sqldb = require("../services/sqldb");
var User = sqldb.User;
var OAuthClient = sqldb.OAuthClient;
var crypto = require("crypto");
var generate = require("../services/generate_packet");
var config = require('./../config/config');
exports.login = async (data) => {
  let check;
  let username = data.username;
  let password = data.password;
  console.log(config.url_base)
  try {
    let user = await User.findOne({
      where: { username: username },
      attributes: ["id", "username", "password", "scope", "salt"],
    });
    if (user === null) {
      console.log("Not found!");
      return generate.packdata("auth", "login", "Y", "1", "Login error.", "");
    } else {
      //console.log(user instanceof User); // true
      let salt = user.salt;
      var hashsalt = crypto
        .createHash(process.env.ALGORITHM_CRYTO)
        .update(password + salt)
        .digest("hex");
      if (user.password == hashsalt) {
        let client_id = makeid(10);
        let client_secret = makeid(20);
        let auth =
          "Basic " +
          Buffer.from(client_id + ":" + client_secret).toString("base64");
        await OAuthClient.create({
          client_id: client_id,
          client_secret: client_secret,
          redirect_uri: config.url_base+"me",
          scope: user.scope,
          user_id: user.id,
        });
        let client = {
          client_token: auth,
          client_id: client_id,
          client_secret: client_secret
        };
        return generate.packdata(
          "auth",
          "login",
          "N",
          "0",
          "Login successfully.",
          client
        );
      } else {
        return generate.packdata("auth", "login", "Y", "1", "Login error.", "");
      }
    }
  } catch (err) {
    return generate.packdata(
      "auth",
      "login",
      "Y",
      "0",
      "Failed, error: " + err.message,
      ""
    );
  } finally {
  }
};

function makeid(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
