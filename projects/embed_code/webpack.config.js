var path = require('path'),
    webpack = require("webpack");

// Base configuration, that defines module resolution
module.exports = {

    // base directory
    context: path.join(__dirname, "/dev/js"),

    entry: "./main.js",

    output: {
        path: "./dist",
        filename: "embed.js"
    },

    resolve: {

        root: [
            path.resolve(__dirname, "./dev/js"),
        ],

        alias: {}
    },

    module: {
        loaders: [{
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
            },
        ]
    },

    plugins: [
        // load Bower packages
        new webpack.ResolverPlugin(
            new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin("bower.json", ["main"])
        ),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            mangle: true
        })
    ]
};