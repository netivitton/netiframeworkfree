var AWS = require("aws-sdk");
var fs = require("fs");
var path_lib = require("path");
const uuidv4 = require("uuid/v4");
const request = require("request");
const util = require("util");
var connection = require("../services/dbconnect");
AWS.config.update({
  accessKeyId: process.env.S3_ACCESSKEYID,
  secretAccessKey: process.env.S3_SECRETACCESSKEY,
  region: process.env.S3_REGION,
});
var s3Stream = require("s3-upload-stream")(new AWS.S3());
var s3 = new AWS.S3();

var myBucket = process.env.S3_MYBUCKET;
var main_path = process.env.S3_MAIN_PATH;

exports.upload_aws_s3_image = (data_base64, path, types_file) => {
  let name = uuidv4();
  try {
    types_file = data_base64.split(";")[0].split("/")[1];
    data_base64 = new Buffer.from(
      data_base64.replace(/^data:image\/\w+;base64,/, ""),
      "base64"
    );
  } catch (error) {
    console.log("Convert OK");
  }
  let filename = name + "." + types_file;
  let path_pwd = main_path + "/" + path + "/" + filename;
  const params = {
    Bucket: myBucket, // pass your bucket name
    Key: path_pwd, // file will be saved as testBucket/contacts.csv
    Body: data_base64,
    ContentEncoding: "base64", // required
    ContentType: `image/${types_file}`, // required. Notice the back ticks
  };
  try {
    s3.upload(params).promise();
    return filename;
  } catch (error) {
    console.log(error);
    return "Error";
  }
};

exports.upload_aws_s3_all = (data_base64, path, types_file) => {
  let name = uuidv4();
  try {
    types_file = data_base64.split(";")[0].split("/")[1];
    let contentType = "";
    console.log(types_file);
    if (types_file == "pdf") {
      data_base64 = new Buffer.from(
        data_base64.replace(/^data:application\/pdf\/\w+;base64,/, ""),
        "base64"
      );
      contentType = "application/pdf";
    } else {
      data_base64 = new Buffer.from(
        data_base64.replace(/^data:image\/\w+;base64,/, ""),
        "base64"
      );
      contentType = "image/" + types_file;
    }
    let filename = name + "." + types_file;
    let path_pwd = main_path + "/" + path + "/" + filename;

    let params = {
      Bucket: myBucket, // pass your bucket name
      Key: path_pwd, // file will be saved as testBucket/contacts.csv
      Body: data_base64,
      ContentEncoding: "base64", // required
      ContentType: contentType, // required. Notice the back ticks
    };
    try {
      s3.upload(params).promise();
      return filename;
    } catch (error) {
      console.log(error);
      return "Error";
    }
  } catch (error) {
    console.log(error);
    console.log("Convert OK");
  }
};

exports.upload_aws_s3_pdf = async (
  data,
  path,
  name,
  prescription_id,
  path_sql
) => {
  let filename = name + "." + "pdf";
  let path_pwd = main_path + "/" + path + "/" + filename;
  try {
    const params = {
      Bucket: myBucket, // pass your bucket name
      Key: path_pwd, // file will be saved as testBucket/contacts.csv
      ContentType: "application/pdf",
    };

    var upload = s3Stream.upload(params);
    request(data)
      .on("error", async function (err) {
        let sql =
          "UPDATE `" +
          path_sql +
          "` SET `file_prescription` = ? WHERE `id` = ?;";
        await connection.query(sql, ["", prescription_id]);
      })
      .pipe(upload)
      .on("error", async function (err) {
        let sql =
          "UPDATE `" +
          path_sql +
          "` SET `file_prescription` = ? WHERE `id` = ?;";
        await connection.query(sql, ["", prescription_id]);
      })
      .on("finish", async function (err) {
        let sql =
          "UPDATE `" +
          path_sql +
          "` SET `file_prescription` = ? WHERE `id` = ?;";
        await connection.query(sql, [filename, prescription_id]);
      });
      return;
  } catch (error) {
    return "";
  }
};

exports.get_aws_s3_file = (filename, path) => {
  let path_pwd = main_path + "/" + path + "/" + filename;
  const params = {
    Bucket: myBucket, // pass your bucket name
    Key: path_pwd,
  };
  try {
    console.log(path_pwd);
    let s3object = s3.getObject(params).promise();
    return s3object;
  } catch (error) {
    console.log(error);
    return "Error";
  }
};

exports.delete_aws_s3_file = (filename, path) => {
  let path_pwd = main_path + "/" + path + "/" + filename;
  const params = {
    Bucket: myBucket, // pass your bucket name
    Key: path_pwd,
  };
  try {
    console.log(path_pwd);
    let s3object = s3.deleteObject(params).promise();
    return s3object;
  } catch (error) {
    console.log(error);
    return "Error";
  }
};
