var ReactRedux = require('react-redux'),
	Component = require('./component'),
	actions = require('actions');


var mapState = function(state, ownProps){
	return {
		videoRevision: state.videoRevision,
		playerState: state.playerState,
		environment: state.environment
	};
};

var mapDispatch = function(dispatch, ownProps) {
	return {
		onSizeChange: function(width, height) {
			dispatch(actions.updatePlayerSize(width, height));
		},
		onInteractionReceived: function() {

			// delay, so controls stay collapsed during this events
			// bubbling phase
			setTimeout(function(){
				dispatch(actions.uncollapseUI()); // throttled..
				dispatch(actions.collapseUI()); // debounced..
			},200);
		},
		onKeyDown: function(event) {
			switch (event.keyCode) {
				case 32: // space key
					dispatch(actions.togglePlay());
					break;
				case 27: // escape key
					dispatch(actions.closeMarker());
					break;
			};
		},
		onFullscreenChanged: function(isFullscreen) {
			dispatch(actions.setIsFullscreen(isFullscreen)); 
		},
		onPlayerHidden: function() {
			dispatch(actions.playerHidden()); 
		}
	};
};

module.exports = ReactRedux.connect(mapState, mapDispatch)(Component);


