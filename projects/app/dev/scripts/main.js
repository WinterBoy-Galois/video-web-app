/*
 * Start our App
 */

 // include olark for customer feedback
if ("production" == process.env.NODE_ENV) require('lib/olark');

// include stayles
require('style/style.css');

// start the app
var App = require('app');
App.start();
