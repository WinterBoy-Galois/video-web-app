require('_old/util/old_browser_shims');

var $ = require('jquery'),
    Marionette = require('marionette'),
    VideoRetriever = require('_old/services/video_retrieve_service'),
    VideoEngineController = require('_old/controllers/video_engine/controller'),
    BrowserSupport = require('shared/util/browser_support_helpers'),
    Player = require('_old/player/api'),
    PasswordView = require('_old/misc/passwordview');

require('_old/misc/dom_setup');
require('behaviors');


function startPlayer(video, Controller) {

    // add iPhone class to html tag to deal better width safari chrome
    if (BrowserSupport.iPhone) {
        document.documentElement.className += ' iphone';
        // ios 7.1 bug:
        window.scrollTo(0, 0);
    }

    // create base app with main region
    var app = new Marionette.Application();
    app.addRegions({
        'playerRegion': '.vp_player_app'
    });
    app.start();

    // start api
    Player.setup(video);

    // start videoEngine separated from
    // the rest of the representation logic,
    // which shoud be pluggable and exchangable
    var engine = new VideoEngineController(Player);

    // save bootstrap reference
    var bootstrap = $("#vp_bootstrap");
    var controller = new Controller({
        player: Player,
        engine: engine
    });
    app.playerRegion.show(controller.rootView);

    // add bootstrap back in
    // this is a bit hackerish....
    $(".vp_bootstrap_wrapper").append(bootstrap);

    // save reference on document
    document.videopath = document.videopath || {};
    document.videopath.player = document.videopath.player || {};
    document.videopath.player.api = Player.api;

    // this event needs to be caught on the body
    // so the ipad does not bounce
    // should move somewhere else later
    if (document.body.addEventListener) {
        document.body.addEventListener('touchmove', function(evt) {
            evt.preventDefault();
        });
    }

    // ReactDom.render(<AppContainer />, document.getElementById('vp_player_app'));
}


function setupPlayer(config) {

    // get video data
    VideoRetriever.retrieve(new PasswordView()).then(

        // success
        function(video) {
            // set some stuff
            document.title = "videopath - " + video.get("title");
            startPlayer(video, config.controller);
        },

        // error
        function() {
            // on error notify user
            console.log("Not avail");
        }
    );
}


// initialize player
function init(config) {
    var interval = setInterval(function() {
        if ($(".vp_player_app").length === 1) {
            clearInterval(interval);
            setupPlayer(config);
        }
    }, 100);
}


module.exports = {
    init: init
};