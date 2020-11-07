var _ = require('underscore'),
	adapter = require('./base');


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

function postFrameMessage(message) {
    try {
        window.parent.postMessage(message, '*');
    } catch (e_) {}
}

module.exports = _.extend({}, adapter, {

	play: function() {
		postFrameMessage(commands['play']);
	},

	quartile: function(index) {
		postFrameMessage(commands['quartiles'][index]);
	},

	time: function(seconds) {
		if ( seconds == 30 ) {
			postFrameMessage(commands['sec30']);
		}
		postFrameMessage(commands['progress'] + seconds);
	},

	openMarker: function() {
		postFrameMessage(commands['click']);
	},

	ended: function() {
		postFrameMessage(commands['ended']);
	},

});