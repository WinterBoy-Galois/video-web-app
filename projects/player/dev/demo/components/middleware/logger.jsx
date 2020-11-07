var logger = function(store) {
	return function(next) {
		return function(action) {
			var result = next(action);
			return result;
		};
	};
};

module.exports = logger;
