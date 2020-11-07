var path = require('path');
var webpack = require("webpack");
var StatsPlugin = require('stats-webpack-plugin');

// Base configuration, that defines module resolution
module.exports = {
    // base directory
    context: path.join(__dirname, "/dev/scripts"),

    entry: {
        desktop: "./desktop_app.js",
        bootstrap: "./bootstrap.js",
        bootstrap6 : "./bootstrap6/index.js",
        'demo/components': "../demo/components/index.jsx",
        'demo/player': "../demo/player/index.jsx",
        player: "./player_app.jsx"
    },

    output: {
        path: "./dist",
        filename: "scripts/[name].js",
        chunkFilename: "scripts/[name].[id].chunk.js"
    },

    resolve: {
        extensions: ["", ".webpack.js", ".web.js", ".js", ".jsx", ".json"],
        root: [
            path.resolve(__dirname, "../../custom_modules"),
            path.resolve(__dirname, "../../bower_modules"),
            path.resolve(__dirname, "./dev/scripts"),
            path.resolve(__dirname, "./dist")
        ],
        alias: {

            shared: path.resolve(__dirname, "../shared/scripts"),
            widgets: path.resolve(__dirname, "../shared/scripts/views/widgets"),
            behaviors: path.resolve(__dirname, '../shared/scripts/views/behaviors/behaviors'),
            sdk: path.resolve(__dirname, '../shared/scripts/sdk'),

            css: path.resolve(__dirname, './dev/css'),
            marionette: 'backbone.marionette',
            stickit: 'backbone.stickit',
            radio: 'backbone.radio',
            tinycolor: 'tinycolor2',
            modernizr: 'modernizr/modernizr',

            jquery_ui: 'jquery-ui/jquery-ui',
            spectrum: 'spectrum/spectrum',
            frogaloop: 'frogaloop/frogaloop.min',
            ga: 'google-analytics/analytics',
            jqstorage: 'jQuery-Storage-API/jquery.storageapi',
            analytics: 'services/analytics_service',
            tooltipster: 'tooltipster/js/jquery.tooltipster',
            cryptojs_aes: 'cryptojs_aes/aes',
            cryptojs_sha256: 'cryptojs_sha256/sha256',

            // test-setup
            helpers: path.resolve(__dirname, "dev/test/helpers"),
            fixtures: path.resolve(__dirname, "dev/test/fixtures")
        }
    },

    resolveLoader: {
        root: [
            path.resolve(__dirname, '../../custom_modules')
        ]
    },

    module: {
        loaders: [
            {
                test: /\.jsx$/,
                loader: "babel"
            }, 
            {
                test: /\.html$/,
                loader: "html-loader?attrs=notag:noattr"
            }, // disable image loading with notag:noattr hack
            {
                test: /\.css$/,
                loader: "style-loader!css-loader"
            }, 
            {
                test: /\.scss$/,
                loaders: ["style", "css", "sass?outputStyle=compressed"]
            },
            {
                test: /\.(png|jpg|svg|eot|woff|ttf)$/,
                loader: "url-loader?limit=100000&name=assets/[name].[ext]"
            }, {
                test: /\.json$/,
                loader: 'json-loader'
            }, {
                test: /modernizr/,
                loader: "imports?this=>window!exports?Modernizr"
            }, {
                test: /tooltipster/,
                loader: "imports?jQuery=jquery"
            }, {
                test: /frogaloop/,
                loader: "exports?Froogaloop"
            }, {
                test: /cryptojs_sha256/,
                loader: "exports?Crypto.SHA256"
            }, {
                test: /cryptojs_aes/,
                loader: "exports?Crypto.AES"
            }
        ]
    },

    sassLoader: {
        // compass replacement...
        includePaths: require('node-bourbon').includePaths
    },

    plugins: [
        // load Bower packages
        new webpack.ResolverPlugin(
            new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin("bower.json", ["main"])
        ),
        new webpack.ProvidePlugin({
            //'Promise': 'es6-promise', // Thanks Aaron (https://gist.github.com/Couto/b29676dd1ab8714a818f#gistcomment-1584602)
            //'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
        }),
        /* new StatsPlugin('../../player_stats.json', {
              chunkModules: true,
        }) */
    ]
};