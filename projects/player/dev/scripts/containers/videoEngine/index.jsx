var ReactRedux = require('react-redux'),
	Component = require('./component'),

	actions = require('actions'),
	UIS = require('const').UIS;


var mapState = function(state, ownProps){
	return {
		service: state.playerState.useSpritePlayback ? 'sprites' : state.videoRevision.source.service,
		source: state.videoRevision.source,
		engineCommands: state.engineCommands,
		mobilePortraitUI: state.playerState.ui === UIS.MOBILE_PORTRAIT,
	};
};

var mapDispatch = function(dispatch, ownProps) {
	return {
		onStateChange: function(state, message) {
			dispatch(actions.engineStateChange(state, message));
		},
		onVolumeChange: function(volume) {
			dispatch(actions.engineVolumeChange(volume));
		},
		onProgressChange: function(progress) {
			dispatch(actions.engineProgressChange(progress));
		},
		onBufferChange: function(buffer) {
			dispatch(actions.engineBufferChange(buffer));
		},
		onDurationChange: function(duration) {
			dispatch(actions.engineDurationChange(duration));
		}
	};
};

module.exports = ReactRedux.connect(mapState, mapDispatch)(Component);


