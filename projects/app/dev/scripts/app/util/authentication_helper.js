var $ = require('jquery'),
    sdk = require('sdk');

require('jqstorage');

/*
 *	Extract Token from URL
 */
var tokenFromURL = function() {
    var tokenRegex = /token\/([a-zA-Z0-9]*)/,
        matches = tokenRegex.exec(window.location);
    if (matches) {
        return matches[1];
    }
};

var nextFromURL = function(){
    var nextRegex = /next=([a-zA-Z0-9\/_\-]*)/,
        matches = nextRegex.exec(window.location);
    if (matches) {
        return matches[1];
    }
    return '';
};

/*
 * Local Storage token
 */
var key = "token";
var getSavedToken = function() {
    try {
        return $.localStorage.get(key);
    } catch(_){};
    return false;
};
var setSavedToken = function(token) {
    try {
        $.localStorage.set(key, token);
    } catch(_){};
};

// always capture current current token before leaving page
window.onbeforeunload = function() {
    setSavedToken(sdk.users.getToken());
};

var authenticate = function() {

    // authenticate with url token
    var urlToken = tokenFromURL();
    if (urlToken) {
        window.location.hash = nextFromURL();
        return sdk.users.login_ot_token(urlToken).then(function() {
            setSavedToken(sdk.users.getToken());
        });
    }

    // authenticate with local storage token
    var savedToken = getSavedToken();
    if (savedToken) {
        return sdk.users.login_token(savedToken);
    }

    // no tokens, all done
    var dfd = $.Deferred();
    dfd.resolve();
    return dfd.promise();

};

module.exports = {
    authenticate: authenticate
};