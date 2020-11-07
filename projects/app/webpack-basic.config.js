var path = require('path');
var webpack = require("webpack");
var StatsPlugin = require('stats-webpack-plugin');

// Base configuration, that defines module resolution
module.exports = {

    // base directory
    context: path.join(__dirname, "/dev/scripts"),

    entry: {
        main: "./main.js",
        components: "../demo/components.jsx"
    },

    output: {
        path: "./dist",
        filename: "scripts/[name].js"
    },

    resolve: {

        extensions: ["", ".webpack.js", ".web.js", ".js", ".jsx"],

        root: [
            path.resolve(__dirname, "../../custom_modules"),
            path.resolve(__dirname, "../../bower_modules"),
            path.resolve(__dirname, "./dev/scripts"),
            path.resolve(__dirname, "./dist") // images in html templates
        ],

        alias: {

            strings: 'config/strings',
            countries: 'config/countries',

            shared: path.resolve(__dirname, "../shared/scripts"),
            widgets: path.resolve(__dirname, "../shared/scripts/views/widgets"),
            behaviors: path.resolve(__dirname, '../shared/scripts/views/behaviors/behaviors'),
            sdk: path.resolve(__dirname, '../shared/scripts/sdk'),

            marionette: 'backbone.marionette',
            stickit: 'backbone.stickit',
            radio: 'backbone.radio',
            chart: 'chart.js',
            tinycolor: 'tinycolor2',

            // moment:'moment/min/moment.min.js', // karma is not starting with min build
            jquery_ui: 'jquery-ui/jquery-ui',
            spectrum: 'spectrum/spectrum',
            frogaloop: 'frogaloop/frogaloop.min',
            ga: 'google-analytics/analytics',
            jqstorage: 'jQuery-Storage-API/jquery.storageapi',
            jqtimeago: 'jquery-timeago',
            analytics: '_deprecated/analytics_service',
            tooltipster: 'tooltipster/js/jquery.tooltipster',
            modernizr: 'modernizr/modernizr',

            // test-setup
            helpers: path.resolve(__dirname, "dev/test/helpers"),
            fixtures: path.resolve(__dirname, "dev/test/fixtures")
        }
    },

    module: {
        loaders: [
            {
                test: /\.jsx$/,
                exclude: /(node_modules|bower_modules)/,
                loader: "babel"
            }, // disable image loading with notag:noattr hack
            {
                test: /\.html$/,
                loader: "html-loader?attrs=notag:noattr"
            }, // disable image loading with notag:noattr hack
            {
                test: /\.css$/,
                loader: "style-loader!css-loader"
            }, {
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
            }
        ]
    },

    plugins: [
        // load Bower packages
        new webpack.ResolverPlugin(
            new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin("bower.json", ["main"])
        ),
        /* new StatsPlugin('../../app_stats.json', {
              chunkModules: true,
        }) */
        new webpack.DefinePlugin({
            "process.env": {
                "LOCAL_DEV_DOMAIN": JSON.stringify(process.env.LOCAL_DEV_DOMAIN),
                "LOCAL_DEV_API_PORT": JSON.stringify(process.env.LOCAL_DEV_API_PORT),
            }
        })
    ]
};
