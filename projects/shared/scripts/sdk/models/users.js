var config = require('../config'),
    ajax = require('../util/ajax'),
    User = require('./user');

var currentUser = new User(),
    ot_token = false,
    token = false;

/*
 *  remember a confirmed token, clear a token
 */
function setToken(_token, _ot_token) {
    token = _token;
    ot_token = _ot_token;
    ajax.setToken(_token);
}

/*
 * Login, either with token or username / password
 */
var login_token = function(_token) {

    // check token by loading user
    ajax.setToken(_token);

    return currentUser.fetch()
        .then(function() {
            setToken(_token);
        }).fail(function() {
            // clear token again ‚
            setToken(false);
        });

};


/*
 * Login with one time token to get user and token  
 */
var login_ot_token = function(token) {
    return login_password("", token);
};


/*
 * Login with username and password
 */
var login_password = function(username, password) {
    username = username.toLowerCase();
    return ajax.post({
        url: config.urls.apiTokenURL,
        data: {
            username: username,
            password: password
        }
    }).then(function(result) {
        // set api token
        setToken(result.api_token, result.api_token_once);
        // load user data
        currentUser.set(result.user);
        return currentUser;
    });
};


/*
 * Signup
 */
var signup = function(username, email, pw, pw2, first, last, birth, gender, occupation, industry, industry_other, phone, newsletter, campaign) {
    return ajax.post({
        url: config.urls.usersURL,
        data: {
            username: username,
            email: email,
            first_name: first,
            last_name: last,
            password: pw,
            password2: pw2,
            birthdate: birth,
            gender: gender,
            occupation: occupation,
            industry: industry,
            industry_other: industry_other,
            phone: phone,
            newsletter: newsletter,
            campaign:campaign
        }
    }).then(function() {
        return login_password(username, pw);
    });
};


/*
 *	Signout and delete token
 */
var logout = function() {
    var request = ajax.del({
        url: config.urls.apiTokenURL
    });
    ajax.setToken(false);
    currentUser.reset();
    return request;
};


/*
 * Request password reset
 */
var resetPassword = function(username) {
    return ajax.post({
        url: config.urls.resetPasswordURL,
        data: {
            username: username
        }
    });
};


/*
 * Access to current user instance
 */
var getCurrentUser = function() {
    return currentUser;
};

var getOTToken = function() {
    return ot_token;
};

var getToken = function() {
    return token;
};


module.exports = {
    login_password: login_password,
    login_token: login_token,
    login_ot_token: login_ot_token,
    logout: logout,
    signup: signup,
    resetPassword: resetPassword,
    getCurrentUser: getCurrentUser,
    getOTToken: getOTToken,
    getToken: getToken
};
