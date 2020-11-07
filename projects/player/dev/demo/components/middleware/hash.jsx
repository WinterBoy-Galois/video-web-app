/*
 * Keep page hash in sync
 */
var _ = require('underscore');

var hash = function(store) {
	return function(next) {
		return function(action) {
			var oldApp = store.getState().app,
				result = next(action),
				newApp = store.getState().app;
			if ( oldApp != newApp ) {
				var url = _.reduce(newApp.urlVars, function(memo,item,key){
					return memo + key + '=' + item + '&';
				}, '?');
				url += '#' + newApp.path.join('/');
				window.history.replaceState({}, '', url);

			}
			return result;
		};
	};
};

module.exports = hash;
