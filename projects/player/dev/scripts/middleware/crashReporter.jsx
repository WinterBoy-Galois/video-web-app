
var crashReporter = function(store) {
	var lastActions = {};
	return function(next) {
		return function(action) {
			try {
				return next(action);
			} 
			catch (err) {
				console.error('Caught an exception!', err);
				if (Raven)
					Raven.captureException(err, {
						extra: {
							action:lastActions,
							state: store.getState()
							}
						});
				throw err;
			}
		};
	};
};

module.exports = crashReporter;
