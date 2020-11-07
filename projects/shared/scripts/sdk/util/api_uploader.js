/*
 *   Upload a file to the JSON API
 */

var $ = require("jquery"),
    _ = require("underscore");

var defaultUploadConfig = {
    maxSize: 1000000
};


var uploadFile = function(url, file, config)  {

    config = _.extend(defaultUploadConfig, config);

    var formdata = new FormData();
    formdata.append('file', file);

    return $.ajax({
        url: url,
        type: 'PUT',
        data: formdata,
        contentType: false,
        processData: false,
        cache: false
    });
};

var deleteFile = function(url) {
    return $.ajax({
        url: url,
        type: 'DELETE'
    });
};

module.exports = {
    uploadFile: uploadFile,
    deleteFile: deleteFile
};