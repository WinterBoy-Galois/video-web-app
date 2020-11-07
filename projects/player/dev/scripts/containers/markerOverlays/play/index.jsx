var _ = require('underscore'),
	ReactRedux = require('react-redux'),
	Component = require('./component'),
	actions = require('actions');


var mapState = function(state, ownProps){
	var overlay = state.videoRevision.markers[state.playerState.openedMarker];
	return {
		viewedMarkers: _.map(state.playerState.viewedMarkers, function(item){ return state.videoRevision.markers[item]; }),
		openedMarker: overlay ? overlay : false,
		playerWidth: state.environment.playerWidth,
		playerHeight: state.environment.playerHeight
	};
};

var mapDispatch = function(dispatch, ownProps) {
	return {
		onCloseClicked: function() {
			dispatch(actions.closeMarker());
		}
	};
};

module.exports = ReactRedux.connect(mapState, mapDispatch)(Component);

// export for debugging purposes
module.exports._mapState = mapState;
module.exports._mapDispatch = mapDispatch;
module.exports._component = Component;
