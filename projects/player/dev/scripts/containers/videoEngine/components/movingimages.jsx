var _ = require('underscore'),
	React = require('react'),
	scriptjs = require('scriptjs'),
	EngineMixin = require('../mixins/engineMixin');


var JS_URL = '//e.video-cdn.net/v2/embed.js';

/*
 *	Template
 */
function r() {

	return (
		<div className = 'vpp_engine_movingimages'>
			<div ref = "player" id="vpp_moving_images_player"></div>
		</div>
	);
	
}

var VideoEngine = React.createClass({

	mixins: [EngineMixin],

	render: r,

	getInitialState: function() {
		return {};
	},

	shouldComponentUpdate: function() {
		return false;
	},

	componentDidMount: function() {

        var engineProps = this.props.source.service_identifier;
        if (!_.isObject(engineProps)) engineProps = JSON.parse(engineProps);

		// fix incorrect moving images attributes
    	this.refs.player.setAttribute('mi24-video-player', true);
    	this.refs.player.setAttribute('video-id', engineProps.video_id);
    	this.refs.player.setAttribute('player-id',  engineProps.player_id);
    	this.refs.player.setAttribute('config-type', 'vmpro');
    	this.refs.player.setAttribute('flash-path', '//e.video-cdn.net/v2/');
    	this.refs.player.setAttribute('api-url', '//d.video-cdn.net/play');
	},	

	componentWillUnmount: function() {
		// unregister events
		VideoPlayer.Collection.removePlayerById('vpp_moving_images_player');
	},


	setup: function() {
		var _this = this;
		if ( window.VideoPlayer ) {
			this.tryInitPlayer();
		} else {
			scriptjs(JS_URL, function(){
        		_this.tryInitPlayer();
        	});
		}
	},

	tryInitPlayer: function() {
		this.player = false;
		try {
			this.player = VideoPlayer.Collection.getPlayerById('vpp_moving_images_player');
			this.onReady();
		} catch (_) {
			this.initTimeout = setTimeout(this.tryInitPlayer, 20);
		}
	},

	onReady: function() {

		// register events
		this.player.registerEventListener('play', this.onPlaying);
		this.player.registerEventListener('pause', this.onPause);
		this.player.registerEventListener('ended', this.onEnded);
		this.player.registerEventListener('progress', this.onProgress);
		this.player.registerEventListener('timeupdate', this.onUpdate);

		this.tryGetDuration();

	},
	// OK

	tryGetDuration: function() {
		var duration = this.player.getDuration();
		if ( duration ) {
			this.props.onDurationChange(duration);
			this.props.onStateChange('ready');
		} else {
			setTimeout(this.tryGetDuration, 100);
		}
	},

	onLoadedMetadata: function() {
		this.props.onDurationChange(this.player.getDuration());
	},

	onTimeUpdate: function() {
		var progress = this.refs.video.currentTime / this.refs.video.duration;
		progress = isNaN(progress) ? 0 : progress;
        this.props.onProgressChange(progress > 1 ? 1 : progress);
	},

	onPause: function() {
		this.props.onStateChange('paused');
	},

	onPlaying: function() {
		this.props.onStateChange('playing');
	},

	onEnded: function() {
		this.props.onStateChange('ended');
	},

	onUpdate: function() {
		var progress = this.player.getCurrentTime() / this.player.getDuration();
		progress = isNaN(progress) ? 0 : progress;
        this.props.onProgressChange(progress > 1 ? 1 : progress);
	},
	
	onProgress: function() {
		var buffered = this.player.getBufferedTime(),
			duration = this.player.getDuration();
	    this.props.onBufferChange(buffered/duration);
	},


	// Commands
	play: function() {
		this.props.onStateChange('buffering');
		this.player.play();
	},

	pause: function() {
		this.player.pause();
	},

	setProgress: function(value) {
		var newProgress = value * this.player.getDuration();
		this.player.play(newProgress);
	},

	setVolume: function(value) {
		var newVolume = value > 0 ? 1 : 0;
		this.player.setMuted(!newVolume);
		this.props.onVolumeChange(newVolume);
	}

	
});

/*
 *	Class
 */
module.exports = VideoEngine;



