var express = require('express');
var router = express.Router();
var fs = require("fs");
var crypto = require('crypto');
var index_m = require('../controllers/index_c');
/* GET home page. */
router.get('/', async (req, res, next) => {
  var hashsalt = crypto.createHash(process.env.ALGORITHM_CRYTO).update("Server_pass").digest('hex');
  console.log(hashsalt);
  res.header("Content-Type", "application/json; charset=utf-8");
  res.send("");
});

router.post('/login', async (req, res, next) => {
  let req_data = JSON.parse(JSON.stringify(req.body));
  let result = await index_m.login(req_data);

  res.header("Content-Type", "application/json; charset=utf-8");
  res.send(result);
});




module.exports = router;