var _ = require('underscore');

/*
 *  Map url names to config file
 */

var local_dev_domain = process.env.LOCAL_DEV_DOMAIN || 'localhost'; 

var confMap = {
    'app.': require('./config'),
    'app-dev.': require('./config_dev'),
    '10.0.2.2': require('./config_local'),
    '127.0.0.1': require('./config_local')
};
confMap[local_dev_domain] = require('./config_local');

var config;
_.forEach(confMap, function(c, key) {
    if (window.location.host.indexOf(key) >= 0) {
        config = c;
    }
});


/*
 *  URL helpers
 */
config.getQueryVariable = function(variable) {
    variable = variable.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp(variable + "=([^&]*)"),
        results = regex.exec(location.hash);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
};


module.exports = config;
