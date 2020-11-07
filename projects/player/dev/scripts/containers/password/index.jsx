var ReactRedux = require('react-redux'),
	Component = require('./component'),
	actions = require('actions');


var mapState = function(state, ownProps){
	return {
		showError: state.playerState.decryptTries > 0,
		disabled: state.playerState.decryptTries  > 3
	};
};

var mapDispatch = function(dispatch, ownProps) {
	return {
		onSubmitPassword: function(password) {
			dispatch(actions.decryptVideo(password));
		}
	};
};

module.exports = ReactRedux.connect(mapState, mapDispatch)(Component);

// export for debugging purposes
module.exports._mapState = mapState;
module.exports._mapDispatch = mapDispatch;
module.exports._component = Component;
