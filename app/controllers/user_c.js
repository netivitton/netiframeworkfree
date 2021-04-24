var sqldb = require("../services/sqldb");
var User = sqldb.User;
var OAuthClient = sqldb.OAuthClient;
var generate = require("../services/generate_packet");
var config = require("../config/config");
var dbconnect = require("../services/dbconnect").connection;
var calculate = require("../services/calculate");
exports.test_list = async (user, data) => {
  let keyword = data.keyword;
  console.log("keyword");
  console.log(keyword);
  try {
    
    const connection = await dbconnect.getConnection();
    let sql_check_admin = "SELECT * FROM demo_table  where name like ?;";
    let result_check_admin = await connection.query(sql_check_admin, [
      "%" + keyword + "%",
    ]);
    datasend = generate.packdata(
      "test_list",
      "test_list",
      "N",
      "0",
      "Test",
      result_check_admin[0]
    );
    return datasend;
  } catch (error) {
    console.log(error);
    datasend = generate.packdata(
      "test_list",
      "test_list",
      "Y",
      "1",
      "Test",
      error
    );
    return datasend;
  }
};

exports.test_post = async (user, data) => {
  let keyword = data.keyword;
  let page = data.page;
  console.log(__('Hello'));
  console.log("keyword");
  console.log(keyword);
  let [limit, offset] = calculate.getPage(page,15);

  try {
    const connection = await dbconnect.getConnection();
    let sql_check_admin =
      "SELECT * FROM demo_table  where name like ? limit ? OFFSET ?;";
    let result_check_admin = await connection.query(sql_check_admin, [
      "%" + keyword + "%",
      limit,
      offset,
    ]);
    datasend = generate.packdata(
      "test_list",
      "test_list",
      "N",
      "0",
      "Test",
      result_check_admin[0]
    );
    return datasend;
  } catch (error) {
    console.log(error);
    datasend = generate.packdata(
      "test_list",
      "test_list",
      "Y",
      "1",
      "Test",
      error
    );
    return datasend;
  }
};
