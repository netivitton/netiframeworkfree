// var AWS = require('aws-sdk');
var fs = require("fs");
var path_lib = require("path");
const uuidv4 = require("uuid/v4");
var azure = require("azure-storage");
var blobService = azure.createBlobService(
  process.env.AZURE_STORAGE,
  process.env.AZURE_STORAGE_KEY
);

exports.azure_storage_images = async (data, path) => {
  let name = uuidv4();
  let split_front = "data:image/";
  let split_last = ";base64,";
  let data_split = data.split(split_front);
  let data_final = data_split[1].split(split_last);
  let types_file = data_final[0];
  let data_base64 = data_final[1];
  try {
    return new Promise((resolve, reject) => {
      let filename = name + "." + types_file;
      fs.writeFile(
        filename,
        data_base64,
        { encoding: "base64" },
        function (err) {
          console.log("File created");

          blobService.createBlockBlobFromLocalFile(
            "images",
            path + "/" + filename,
            filename,
            (error, result, response) => {
              if (!error) {
                console.log("result");
                resolve(result);
                try {
                  fs.unlinkSync(filename);
                  //file removed
                } catch (err) {
                  console.error(err);
                }
                // file uploaded
              } else {
                resolve(error);
                try {
                  fs.unlinkSync(filename);
                  //file removed
                } catch (err) {
                  console.error(err);
                }
                console.log("error");
                console.log(error);
              }
            }
          );
        }
      );
    });
  } catch (error) {
    console.log(error);
    return "Error";
  }
};

exports.azure_storage_excel = async (data, path) => {
  let name = uuidv4();
  // let split_front = "data:image/";
  // let split_last = ";base64,";
  // let data_split = data.split(split_front);
  // let data_final = data_split[1].split(split_last);
  // let types_file = data_final[0];
  // let data_base64 = data_final[1];
  let types_file = "xlsx";
  let data_base64 = data;
  try {
    return new Promise((resolve, reject) => {
      let filename = name + "." + types_file;
      fs.writeFile(
        filename,
        data_base64,
        { encoding: "base64" },
        function (err) {
          console.log("File created");

          blobService.createBlockBlobFromLocalFile(
            "excel",
            path + "/" + filename,
            filename,
            (error, result, response) => {
              if (!error) {
                console.log("result");
                resolve(result);
                try {
                  fs.unlinkSync(filename);
                  //file removed
                } catch (err) {
                  console.error(err);
                }
                // file uploaded
              } else {
                resolve(error);
                try {
                  fs.unlinkSync(filename);
                  //file removed
                } catch (err) {
                  console.error(err);
                }
                console.log("error");
                console.log(error);
              }
            }
          );
        }
      );
    });
  } catch (error) {
    console.log(error);
    return "Error";
  }
};

exports.azure_storage_images_delete = async (data) => {
  try {
    return new Promise((resolve, reject) => {
      blobService.deleteBlobIfExists("images", data, (err, result) => {
        if (err) {
          console.log(err);
          resolve(err);
        }
        resolve(result);
      });
    });
  } catch (error) {
    console.log(error);
    return "Error";
  }
};

exports.azure_storage_get_files = (container,blobName, data) => {
  try {
    // Create a SAS token that expires in an hour
    // Set start time to five minutes ago to avoid clock skew.
    var startDate = new Date();
    startDate.setMinutes(startDate.getMinutes() - 5);
    var expiryDate = new Date(startDate);
    expiryDate.setMinutes(startDate.getMinutes() + 60);

    permissions = azure.BlobUtilities.SharedAccessPermissions.READ;

    var sharedAccessPolicy = {
      AccessPolicy: {
        Permissions: permissions,
        Start: startDate,
        Expiry: expiryDate,
      },
    };

    var sasToken = blobService.generateSharedAccessSignature(
      container,
      blobName,
      sharedAccessPolicy
    );

    return {
      token: sasToken,
      uri: blobService.getUrl(container, blobName, sasToken, true),
    };
  } catch (error) {
    console.log(error);
    return "Error";
  }
};
