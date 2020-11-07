var $ = require('jquery');


// loader mechanims for different libs
var loaders = {

    "twitter": function(callback) {
        $.getScript("//platform.twitter.com/widgets.js", function() {
            callback(window.twttr);
        });
    },

    "facebook": function(callback) {
        $.getScript("//connect.facebook.net/en_US/sdk.js", function() {
            window.FB.init({
                appId: '1597846647106700',
                status: true,
                xfbml: true,
                version: 'v2.3',
            });
            callback(window.FB);
        });
    },

    "pinterest": function(callback) {
        $.getScript("//assets.pinterest.com/js/pinit_main.js", function() {
            for (var key in window) {
                if (key.indexOf("PIN_") === 0) {
                    callback(window[key]);
                }
            }
        });
    },

    "instagram": function(callback) {
        $.getScript("//platform.instagram.com/en_US/embeds.js", function() {
            callback(window.instgrm);
        });
    },

    "google_maps": function(callback) {
        $.getScript("//maps.googleapis.com/maps/api/js?key=AIzaSyBLmIRp_0JZDxWDGl8ZkIzmwT1W1NSOfLk&signed_in=true&callback=initGmaps", function() {});

        window.initGmaps = function() {
            callback(window.google.maps);
        };

    },
};


var libs = {};

function requireLib(lib, callback) {

    // if lib is already available
    // return instantly
    if (libs[lib]) {
        callback(libs[lib], true);
        return;
    }

    // otherwise use the loader
    loaders[lib](function(libRef) {
        libs[lib] = libRef;
        callback(libRef);
    });

}

module.exports = {
    requireLib: requireLib
};