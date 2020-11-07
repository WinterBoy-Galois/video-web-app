var noop = function() {};

if (!window.JSON) {
    window.JSON = {
        stringify: noop,
        parse: noop
    };
}

if (!window.console) {
    window.console = {
        log: noop,
        error: noop,
        debug: noop
    };
}

module.exports = {};