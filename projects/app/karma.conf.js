var webpackConfig = require('./webpack-dev.config');

module.exports = function(config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['mocha', 'chai-sinon'],


        // list of files / patterns to load in the browser
        files: [
            'dev/test/test-main.js'
        ],


        exclude: [],


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            'dev/test/test-main.js': ['webpack', 'sourcemap']
        },


        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['mocha'],


        webpack: webpackConfig,


        webpackMiddleware: {
            // webpack-dev-middleware configuration
            // i. e.
            noInfo: true
        },

        browserNoActivityTimeout: 60000, // give webpack more time to build

        // these need to be included explicitly, for webpack to work
        plugins: [
            require('karma-webpack'),
            require('karma-mocha'),
            require('karma-chai-sinon'),
            //require('karma-chrome-launcher'),
            require('karma-phantomjs-launcher'),
            //require('karma-firefox-launcher'),
            //require('karma-safari-launcher'),
            require('karma-mocha-reporter'),
            require('karma-sourcemap-loader')
        ],

        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['PhantomJS' /*, 'Safari', 'Chrome', 'Firefox'*/ ],


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: true
    });
};
