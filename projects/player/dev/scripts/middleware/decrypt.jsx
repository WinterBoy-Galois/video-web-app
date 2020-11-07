var decrypter = require('util/decrypter'),
	CONST = require('const'),
	actions = require('actions');

var decrypt = function(store) {
	return function(next) {
		return function(action) {
			if ( action.type == CONST.ACTIONS.DECRYPT_VIDEO) {
				var state = store.getState(),
					revision = decrypter.decrypt(action.password, state.videoRevision.salt, state.videoRevision.data);
				if (revision) {
					store.dispatch(actions.updateVideoRevision(revision));
					return;
				}
			}
			return next(action);
		};
	};
};

module.exports = decrypt;
