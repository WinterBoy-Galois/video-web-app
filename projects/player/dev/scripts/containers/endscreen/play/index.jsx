var ReactRedux = require('react-redux'),
	Component = require('./component'),
	actions = require('actions'),
	UIS = require('const').UIS;



var mapState = function(state, ownProps){
	return {
		showing: state.playerState.isEndscreenShowing,
		backgroundColor: state.videoRevision.endscreen_background_color,
		title: state.videoRevision.endscreen_title || state.videoRevision.title,
		subtitle: state.videoRevision.endscreen_subtitle,
		buttonColor: state.videoRevision.endscreen_button_color,
		buttonTitle: state.videoRevision.endscreen_button_title,
		playerWidth: state.environment.playerWidth,
		playerHeight: state.environment.playerHeight,
		branded: state.videoRevision.branded,
		whitelabel: state.videoRevision.whitelabel,
		aspect: state.videoRevision.source.aspect,
		mobilePortraitUI: state.playerState.ui === UIS.MOBILE_PORTRAIT,

		sharingEnabled:  !state.environment.supportsNativeSharing && !state.videoRevision.ui_disable_share_buttons,
	};
};

var mapDispatch = function(dispatch, ownProps) {
	return {
		onReplayClicked: function() {
			dispatch(actions.replay());
		},
		onCTAButtonClicked: function() {
			dispatch(actions.endscreenCTAClick());
		},
		onShareClicked: function(service) {
			dispatch(actions.shareVideo(service, 'endscreen'));
		}
	};
};

module.exports = ReactRedux.connect(mapState, mapDispatch)(Component);

// export for debugging purposes
module.exports._mapState = mapState;
module.exports._mapDispatch = mapDispatch;
module.exports._component = Component;

