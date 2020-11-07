var config = require('./webpack-basic.config.js'),
    update = require('react-addons-update');



var updates =  {
    $merge: {
        stats: {
            colors: true,
            modules: true,
            reasons: true
        },
        devtool: '#cheap-module-eval-source-map',
        cache: true,
        debug: true,
        watch: true,
        keepalive: true,
        failOnError: false

    }
};


module.exports = update(config,updates);
