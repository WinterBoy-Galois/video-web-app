var _ = require('underscore'),
	ACTIONS = require('const').ACTIONS,
	update = require('react-addons-update');



var map = {};

map[ACTIONS.UPDATE_VIDEO_REVISION] = function(state, action) {

	var revision = action.videoRevision;

	if ( revision && revision.markers ) {
		revision = update(revision, {
			markers: {
				$set: _.sortBy(revision.markers, function(item){return item.time;})
			}
		});
	}

	return { $set: revision };
};

map[ACTIONS.RESET] = function() {
	return {$set: false};
};

map['default'] = function() {
	return false;
};

module.exports = map;