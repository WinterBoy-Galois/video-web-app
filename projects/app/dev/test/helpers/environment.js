var $ = require('jquery'),
    Marionette = require('marionette');

require('behaviors');


// initial setup
// create a content region in dom to be able to insert stuff
$(document.body).html("<div id = 'content'></div><div id = 'navbar'></div>");
App = new Marionette.Application();
App.addRegions({
    'contentRegion': '#content',
    'navbarRegion': '#navbar'
});

function rootRegion() {
    // reset region before it is returned to
    // the user
    App.contentRegion.reset();
    return App.contentRegion;
}

module.exports = {

    // root region for displaying
    rootRegion: rootRegion,

};