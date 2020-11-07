var config = require('./webpack-basic.config.js'),
    webpack = require('webpack');
    update = require('react-addons-update');

var plugins = [
    new webpack.DefinePlugin({
        "process.env": {
            "NODE_ENV": JSON.stringify("production")
        }
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
        output: {
            comments: false
        },
        mangle: true
    })
];

var updates = {
    $merge: {
        stats: {
            // Configure the console output
            colors: true,
            modules: true,
            reasons: true
        }
    },
    plugins: {
        $push: plugins
    }
};

module.exports = update(config,updates);
