require('css/mainContainers/player.scss');

var React = require('react'),

	STATES = require('const').STATES,

	fullscreenHelper = require('util/fullscreenHelper'),

	VideoEngine = require('containers/videoEngine'),
	Poster = require('containers/poster'),
	ControlsPlay = require('containers/controls/play'),
	OverlaysPlay = require('containers/markerOverlays/play'),
	EndscreenPlay = require('containers/endscreen/play'),
	Fonts = require('containers/fonts'),
	Password = require('containers/password'),
	ErrorView = require('containers/error'),
	ImagePreloader = require('containers/imagePreloader');


/*
 *	Template
 */
function r() {

	var result;

	if (!this.props.videoRevision) {
		result = false;
	}

	else if ( this.props.playerState.state == STATES.ENCRYPTED ) {
		result = <Password />;
	}

	else if ( this.props.playerState.state == STATES.ERROR ) {
		result = <ErrorView />;
	}

	else {
		result = [
			<ImagePreloader key='imagePreloader' />,
			<Fonts key='fonts' />,
			<VideoEngine key='engine'/>,
			<Poster key ='poster' />,
			<ControlsPlay key='controls' onFullscreenToggle={this.onFullscreenToggle}/>,
			<EndscreenPlay key='endscreen'/>,
			<OverlaysPlay key='overlays'/>
		];
	}

	return (
		<div
			onMouseMoveCapture={this.props.onInteractionReceived} 
			onClickCapture={this.props.onInteractionReceived}
			onTouchMoveCapture={this.props.onInteractionReceived}
			onTouchStartCapture={this.props.onInteractionReceived}
			tabIndex="1" // needed to be able to receive keydown events
			onKeyDown={this.onKeyDown}
			onDragEnter={this.onDragEvent}
			onDragOver={this.onDragEvent}
			ref = 'player' 
			className = 'vpp_player'>
			{result}
		</div>
	);
	
}

var App = React.createClass({
	render: r,

	componentDidMount: function() {

		// player resizing
		this.updateSize();
		this.sizeTimer = setInterval(this.updateSize, 200);

		// fullscreen changes
		fullscreenHelper.addChangeHandler(this.onFullscreenChanged);

		// page visibility
		if ( document.addEventListener )
			document.addEventListener("visibilitychange", this.onVisibilityChange);
	},

	componentWillUnmount: function() {
		clearInterval(this.sizeTimer);
		fullscreenHelper.removeChangeHandler(this.onFullscreenChanged);

		if ( document.removeEventListener )
			document.removeEventListener("visibilitychange", this.onVisibilityChange);
	},

	onKeyDown: function(e) {
		this.props.onInteractionReceived(e);
		this.props.onKeyDown(e);
	},

	/*
	 * Disable dragover events that propagate to the top
	 */
	onDragEvent: function(e) {
		try {
			e.stopPropagation();
	        e.preventDefault();
	        var dt = e.nativeEvent.dataTransfer;
	        dt.effectAllowed = dt.dropEffect = 'none';
    	} catch(_){}
	},

	/*
	 *	 Monitor player size
	 */
	updateSize: function() {
		this.props.onSizeChange(this.refs.player.offsetWidth, this.refs.player.offsetHeight);
	},

	/*
	 * Fullscreen
	 */
	onFullscreenToggle: function() {
		fullscreenHelper.toggleFullscreen(this.refs.player);
	},

	onFullscreenChanged: function() {
		this.props.onFullscreenChanged(fullscreenHelper.isFullscreen());
	},

	/*
	 * Visbility
	 */
	onVisibilityChange: function() {
		if ( document.hidden ) {
			this.props.onPlayerHidden();
		}
	}

});

/*
 *	Class
 */
module.exports = App;

