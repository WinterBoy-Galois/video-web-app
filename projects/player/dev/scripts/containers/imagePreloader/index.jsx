var ReactRedux = require('react-redux'),
	Component = require('./component');

var mapState = function(state, ownProps){
	return {
		videoRevision: state.videoRevision
	};
};

var mapDispatch = function(dispatch, ownProps) {
	return {
	};
};

module.exports = ReactRedux.connect(mapState, mapDispatch)(Component);

// export for debugging purposes
module.exports._mapState = mapState;
module.exports._mapDispatch = mapDispatch;
module.exports._component = Component;
