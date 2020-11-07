var $ = require('jquery'),
    ajax = require('./ajax');


/*
 * creates a new ticket for file upload to our api
 */
function requestTicket(url) {
    return ajax.get({
        url: url
    });
}

/*
 *  Wrap file upload to s3
 *  This needs some form trickery
 */
function uploadS3(url, ticketID, file) {

    // prepare form
    var formdata = new FormData();
    formdata.append('key', ticketID);
    formdata.append('acl', 'bucket-owner-full-control');
    formdata.append('file', file);

    // upload and link proper promise events
    var dfd = new $.Deferred();
    $.ajax({
        url: url,
        data: formdata,
        processData: false,
        contentType: false,
        type: 'POST',
        xhr: function() {
            var myXhr = $.ajaxSettings.xhr();
            if (myXhr.upload) {
                myXhr.upload.addEventListener('progress', function(e) {
                    var p = e.loaded / e.total;
                    dfd.notify(p);
                }, false);
            }
            return myXhr;
        },
        success: dfd.resolve,
        error: dfd.reject
    });
    return dfd.promise();
}


/*
 *  Tell our api that the upload is completed
 */
function notifyComplete(url) {
    return ajax.get({
        url: url
    });
}

function uploadFile(file, ticketURL, completeURL) {

    // temporarily store our ticket ID and s3 URL
    var ticketID = false,
        uploadURL = false;

    // get ticket
    return requestTicket(ticketURL).then(function(result) {
            ticketID = result.ticket_id;
            uploadURL = result.endpoint;
        })
        // do the upload
        .then(function() {
            return uploadS3(uploadURL, ticketID, file);
        })
        // notify completion
        .then(function() {
            return notifyComplete(completeURL + ticketID + '/');
        })
        // ensure we always have a proper error message
        .pipe(false, function() {
            return {
                detail: "Could not upload your file at this time. Please try again later."
            };
        });
}

module.exports = {
    uploadFile: uploadFile
};