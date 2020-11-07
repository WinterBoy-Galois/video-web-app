var ReactRedux = require('react-redux'),
	Component = require('./component'),
	UIS = require('const').UIS;



var mapState = function(state, ownProps){
	return {
		show: !state.playerState.hasPlayed && !state.playerState.allowEngineClickthroughOnStart,
		url: state.videoRevision ? state.videoRevision.thumbnails.large : false,
		width: state.environment.playerWidth,
		height: state.environment.playerHeight,
		mobilePortraitUI: state.playerState.ui === UIS.MOBILE_PORTRAIT,
		source:  state.videoRevision.source

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
