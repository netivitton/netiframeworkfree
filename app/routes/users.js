var express = require("express");
var router = express.Router();
var user_c = require("../controllers/user_c");
var authenticate = require("../services/authenticate");
/* GET users listing. */
router.get("/secure", function (req, res) {
  res.json({ checkLogin: true });
});

router.get("/me", function (req, res) {
  res.json({
    me: req.token_detail,
    messsage:
      "Authorization success, Without Scopes, Try accessing /profile with `profile` scope",
    description:
      "Try postman https://www.getpostman.com/collections/37afd82600127fbeef28",
    more: "pass `profile` scope while Authorize",
  });
});

router.get("/profile", function (req, res) {
  console.log();
  if(req.token_detail.scope == "profile"){
    res.json({
      profile: req.token_detail,
    });
  }else{
    res.json({
      profile: "Admin",
    });
  }

});

router.get("/test_list", async function (req, res) {
  let user = req.token_detail;
  let query = req.query;
  let result = await user_c.test_list(user, query);

  res.send(result);
});

router.post("/test_post", async function (req, res) {
  let user = req.token_detail;
  console.log(req.body);
  res.header("Content-Type", "application/json; charset=utf-8");
  let body = JSON.parse(JSON.stringify(req.body));

  let result = await user_c.test_post(user, body);

  res.send(result);
});

module.exports = router;
