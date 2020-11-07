var ReactRedux = require('react-redux'),
	Component = require('./component'),

	UIS = require('const').UIS,

	actions = require('actions');


var mapState = function(state, ownProps){

	var highlightedMarker = false;

	if ( state.playerState.currentMarker !== false ) {
		highlightedMarker = state.playerState.currentMarker;
	}

	if ( state.playerState.openedMarker !== false ) {
		highlightedMarker = state.playerState.openedMarker;
	}

	var willPlayOnReady = state.environment.autoplayRequested || state.playerState.playOnReadyRequested;

	return {
		playerHeight: state.environment.playerHeight,
		playerWidth: state.environment.playerWidth,
		aspect: state.videoRevision.source.aspect,

		mobilePortraitUI: state.playerState.ui === UIS.MOBILE_PORTRAIT,
		colors: state.theme,
		state: state.playerState.state,
		collapsed: state.playerState.areControlsCollapsed || state.playerState.state == 'initializing',
		videoDuration: state.playerState.duration,
		allowClickthrough: !state.playerState.hasPlayed && state.playerState.allowEngineClickthroughOnStart,

		// markers
		highlightedMarker: highlightedMarker,
		markers: state.videoRevision.markers,
		showClickHint: state.playerState.clickhintCount > 0,
		branded: state.videoRevision.branded,

		// playbar
		progress: state.playerState.progress,
		buffer: state.playerState.buffer,
		customIcon: state.theme.icon.url || false,

		// buttons right
		playerInFullscreen: state.playerState.isFullscreen,
		playerMuted: state.playerState.volume === 0,
		fullscreenEnabled: state.environment.supportsFullscreen,
		volumeEnabled: state.environment.supportsVolumeChanges,
		sharingEnabeld:  !state.environment.supportsNativeSharing && !state.videoRevision.ui_disable_share_buttons,
		sidebuttonsDisabled: state.playerState.openedMarker !== false || state.playerState.isEndscreenShowing !== false,

		// large buttons
		showLargePlayButton: 
			(state.playerState.state == 'ready' || state.playerState.state == 'paused' || ( state.playerState.state == 'initializing' && !willPlayOnReady) )  
				&& !state.playerState.hasPlayed 
				&& !state.playerState.allowEngineClickthroughOnStart,
		showLargeLoadingIndicator: state.playerState.state == 'buffering' || (state.playerState.state == 'initializing' && willPlayOnReady),
		allowLargeButtonsClickThrough: (state.playerState.hasPlayed && !state.playerState.areControlsCollapsed && state.playerState.allowEngineClickthroughWhilePlaying) 
	};
};

var mapDispatch = function(dispatch, ownProps) {
	return {
		onTogglePlayClick: function(){
			dispatch(actions.togglePlay());
		},
		onMarkerClick: function(id) {
			dispatch(actions.openMarker(id));
		},
		onProgressSelected: function(value) {
			dispatch(actions.setProgress(value));
		},
		onVolumeToggleClick: function() {
			dispatch(actions.toggleVolume());
		},
		onShareServiceSelected: function(service) {
			dispatch(actions.shareVideo(service, 'controls'));
		},
		onFullscreenToggleClick: function() {
			ownProps.onFullscreenToggle();
		},
		onIconClick: function() {
			dispatch(actions.iconClick());
		}
	};
};

module.exports = ReactRedux.connect(mapState, mapDispatch)(Component);

// expose for debugging and testing
module.exports._mapDispatch = mapDispatch;
module.exports._mapState = mapState;
module.exports._component = Component;


