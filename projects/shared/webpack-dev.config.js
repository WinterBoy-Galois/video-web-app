var path = require('path'),
    webpack = require('webpack'),
    baseConfig = require('./webpack-basic.config.js'),
    _ = require('underscore');


module.exports = _.extend({}, baseConfig, {

    // base directory
    context: path.join(__dirname, "/scripts"),

    entry: "./main.js",

    output: {
        path: "./demo",
        filename: "scripts/main.js"
    },

    //stats: {
    //    // Configure the console output
    //    colors: true,
    //    modules: true,
    //    reasons: true
    //},

    stats: false,

    devtool: 'cheap-module-eval-source-map',
    cache: true,
    watch: true,
    debug: true,
    keepalive: true,
    failOnError: false

});
