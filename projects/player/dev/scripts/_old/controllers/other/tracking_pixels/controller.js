var Marionette = require("marionette"),
    _ = require("underscore"),
    $ = require("jquery");

var session_random = Math.floor(Math.random() * 1000000),
    tracked_play = false,
    tracked_ended = false,
    trackedQuartiles = [false, false, false, false];

function loadTrackingPixel(url) {
    var img = $('<img class="dynamic">');
    img.attr('src', url);
    img.appendTo($(document.body));
}

function prepareTrackingLink(link) {
    link = link.replace("{unique_session}", session_random);
    link = link.replace("{timestamp}", new Date().getTime());
    return link;
}

function track(links) {
    if (!links) return;
    links = links.split("\n");
    _.each(links, function(value) {
        if (value.length > 5) {
            loadTrackingPixel(prepareTrackingLink(value));
        }
    });
}

module.exports = Marionette.Controller.extend({

    initialize: function(config) {

        var state = config.playerState,
            video = config.video;

        // track start and end events
        state.on("change:state", function(state, newState) {

            if (newState == state.states.ENDED && !tracked_ended) {
                tracked_ended = true;
                track(video.get("tracking_pixel_end"));
            }

            if (newState == state.states.PLAYING && !tracked_play) {
                tracked_play = true;
                track(video.get("tracking_pixel_start"));
            }
        });

        // track progress events
        state.on("change:play_progress_seconds", function(state, progress) {
            var duration = state.get('duration');
            var quartile = Math.floor((progress + 1) / duration * 4);
            if (quartile >= 1 && quartile <= 3 && !trackedQuartiles[quartile]) {
                trackedQuartiles[quartile] = true;
                track(video.get("tracking_pixel_q" + quartile));
            }
        });


    },

});