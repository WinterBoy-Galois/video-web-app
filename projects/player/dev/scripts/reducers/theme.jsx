var ACTIONS = require('const').ACTIONS,
	colorCalculator = require('util/colorCalculator');

var map = {};

map[ACTIONS.UPDATE_VIDEO_REVISION] = function(state, action) {
	return { $set: colorCalculator(action.videoRevision.ui_color_1,action.videoRevision.ui_color_2, action.videoRevision) };
};

map['default'] = function() {
	return colorCalculator('#000000','#FFFFFF');
};

module.exports = map;