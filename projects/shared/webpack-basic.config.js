var path = require('path');
var webpack = require("webpack");

// Base configuration, that defines module resolution
module.exports = {

    resolve: {
        root: [
            path.resolve(__dirname, "../../custom_modules"),
            path.resolve(__dirname, "../../bower_modules"),
            path.resolve(__dirname, "./scripts"),
            path.resolve(__dirname, "./demo")
        ],
        alias: {
            config: 'config/config',
            // /../ is a hack for replaced config with config/config
            test_videos: 'config/../test_videos',
            shared: path.resolve(__dirname, "../shared/scripts"),
            widgets: path.resolve(__dirname, "../shared/scripts/views/widgets"),
            behaviors: path.resolve(__dirname, '../shared/scripts/views/behaviors/behaviors'),
            marionette: 'backbone.marionette',
            stickit: 'backbone.stickit',
            radio: 'backbone.radio',
            chart: 'chart.js',
            tinycolor: 'tinycolor2',

            jquery_ui: 'jquery-ui/jquery-ui',
            spectrum: 'spectrum/spectrum',
            frogaloop: 'frogaloop/frogaloop.min',
            ga: 'google-analytics/analytics',
            jqstorage: 'jQuery-Storage-API/jquery.storageapi',
            analytics: 'services/analytics_service',
            tooltipster: 'tooltipster/js/jquery.tooltipster',
            modernizr: 'modernizr/modernizr',

            // test-setup
            helpers: path.resolve(__dirname, "test/helpers"),
            fixtures: path.resolve(__dirname, "test/fixtures")
        }
    },

    module: {
        loaders: [{
                test: /\.html$/,
                loader: "html-loader?attrs=notag:noattr"
            }, // disable image loading with notag:noattr hack
            {
                test: /modernizr/,
                loader: "imports?this=>window!exports?Modernizr"
            }, {
                test: /tooltipster/,
                loader: "imports?jQuery=jquery"
            }, {
                test: /frogaloop/,
                loader: "exports?Froogaloop"
            }, {
                test: /\.json$/,
                loader: 'json-loader'
            },
        ]
    },

    plugins: [
        // load Bower packages
        new webpack.ResolverPlugin(
            new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin("bower.json", ["main"])
        )
    ]
}