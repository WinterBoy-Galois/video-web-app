var integrationsUtil = require('util/integrationsUtil'),
	CONST = require('const'),
	actions = require('actions');

var decrypt = function(store) {
	return function(next) {
		return function(action) {

			if (action.type == CONST.ACTIONS.SUBSCRIBE_EMAIL ) {
				var key = store.getState().videoRevision.key;
				integrationsUtil.subscribeEmail(key, action.service, action.serviceID, action.email);
			}

			return next(action);
		};
	};
};

module.exports = decrypt;
