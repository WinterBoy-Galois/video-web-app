var ReactRedux = require('react-redux'),
	Component = require('./component'),
	actions = require('actions');


var mapState = function(state, ownProps){
	return {
		theme: state.theme
	};
};

var mapDispatch = function(dispatch, ownProps) {
	return {};
};

module.exports = ReactRedux.connect(mapState, mapDispatch)(Component);

// export for debugging purposes
module.exports._mapState = mapState;
module.exports._mapDispatch = mapDispatch;
module.exports._component = Component;
