/*
 * Helpers for dealing with ajax requests
 */
var jquery = require('jquery'),
    _ = require('underscore'),
    config = require('../config');


/*
 * Settings
 */
var token = false;
var defaults = {
    type: 'GET',
    contentType: 'application/json; charset=utf-8'
};

/*
 *  REST Methods
 */
var get = function(args) {
    args.type = 'GET';
    return ajax(args);
};

var post = function(args) {
    args.type = 'POST';
    return ajax(args);
};

var put = function(args) {
    args.type = 'PUT';
    return ajax(args);
};

var del = function(args) {
    args.type = 'DELETE';
    return ajax(args);
};

var ajax = function(args) {

    // fill in defaults
    _.defaults(args, defaults);

    // convert data to json
    if (args.data) {
        args.data = JSON.stringify(args.data);
    }

    function transformFail(value) {
        var result = value.responseJSON || {};
        result.status = value.status;
        if (result.status === 0) {
            result.detail = config.strings.apiNotReachable;
        }
        if (!result.detail) {
            result.detail = config.strings.apiRequestFailed;
        }
        return result;
    }

    return jquery.ajax(args).pipe(null, transformFail);
};


/*
 *  Set token for auth purposes
 */
var setToken = function(_token) {

    // set token on ajax requests
    token = _token;

    // inject auth token on videopath urls
    jquery.ajaxSettings.beforeSend = function(xhr) {
        if (token && this.url.indexOf(config.urls.endpoint) >= 0) {
            xhr.setRequestHeader('Authorization', 'Token ' + token);
        }
    };
};

module.exports = {
    get: get,
    post: post,
    put: put,
    del: del,
    setToken: setToken
};