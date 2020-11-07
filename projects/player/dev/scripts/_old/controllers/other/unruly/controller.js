var Marionette = require('marionette');


var commands = {
    play: 'unruly_track_view',
    quartiles: [
        'unruly_track_q1',
        'unruly_track_q2',
        'unruly_track_q3',
        'unruly_track_q4',
    ],
    sec30: 'unruly_track_thirty',
    ended: 'unruly_track_complete',
    click: 'unruly_track_click',
    progress: 'unruly_track_time='
};

function postFrameMessage(message, once) {

    if (once && tracked[message]) {
        return;
    }
    tracked[message] = true;
    try {
        window.parent.postMessage(message, '*');
    } catch (e_) {}
}


/*
 * Remember which events have been tracked
 */
var tracked;

function resetTracking() {
    tracked = {};
}
resetTracking();

module.exports = Marionette.Controller.extend({

    initialize: function(config) {

        var state = config.playerState;

        // track start and end events
        state.on('change:state', function(state, newState) {

            // started

            // ended
            if (newState == state.states.ENDED) {
                postFrameMessage(commands.ended);
                resetTracking();
            }

            if (newState == state.states.PLAYING) {
                postFrameMessage(commands.play, true);
            }

        });

        state.on('change:open_marker', function(state, open_marker) {
            if (open_marker > -1) {
                postFrameMessage(commands.click);
            }
        });

        // track progress events
        state.on('change:play_progress_seconds', function(state, progress) {

            if (progress > 30) {
                postFrameMessage(commands.sec30, true);
            }

            // track seconds
            postFrameMessage(commands.progress + progress);

            var duration = state.get('duration');
            var quartile = Math.floor((progress + 1) / duration * 4);
            if (quartile >= 1 && quartile <= 3) {
                postFrameMessage(commands.quartiles[quartile], true);
            }
        });

    },

});