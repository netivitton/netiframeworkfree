exports.packdata = function (model, method, error_flag, error_code, error_desc, data) {
    myArray = {
        "HEAD": {
            "model": model,
            "method": method,
            "error_flag": error_flag,
            "error_code": error_code,
            "error_desc": error_desc
        },
        "BODY": data
    }
    return JSON.stringify(myArray);
};