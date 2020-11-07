// webpack requires all test in this directory and all sub directories

// require('phantomjs-polyfill');
var context = require.context('.', true, /-test\.jsx?$/);
context.keys().forEach(context);