var _ = require('underscore');
var React = require('react');


var strings = {
    ops: require('./operations'),
    lib: require('./library'),
    modals: require('./modals'),
    builder: require('./builder'),
    login: require('./login'),
    integrations: require('./integrations'),
    teams: require('./teams'),
    videos: require('./videos'),
    settings: require('./settings'),
};

function replaceVarsFromArgsArray(string, array) {
    if (!string || !string.replace) {
        return string;
    }
    var i;

    for ( i = 1; i < array.length; i++) {
        string = string.replace('{' + i + '}', array[i]);
    }
    return string;
};

/*
 * Export
 */
module.exports = function(namespace) {

    /*
     * Find string namespace
     */
    var p = namespace.split('.');
    var n = strings;
    _.forEach(p, function(item) {
        if (!n[item]) {
            throw Error('Undefined String namespace: ' + namespace);
        }
        n = n[item];
    });

    /*
     *	Check if key exists and if we need to replace some vars
     */
    return function(key) {
        if (n[key] === undefined) {
            console.warn("undefined string " + namespace + ": " + key);
            return "";
        }
        var result = n[key],
            args = arguments;

        if (_.isObject(result) ) {
            result = _.mapObject(result, function(entry){return replaceVarsFromArgsArray(entry, args);} );
        } else {
            result = replaceVarsFromArgsArray(result, args);
        }
        
        return result;
    };
};

module.exports.strings = strings;
