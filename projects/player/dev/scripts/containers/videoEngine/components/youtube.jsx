var React = require('react'),

	EngineMixin = require('../mixins/engineMixin'),

	loadScript = require('../util/loadScript');

var JS_URL = 'https://www.youtube.com/iframe_api';

/*
 *	Template
 */
function r() {
	return (
		<div className = 'vp_engine_youtube'>
			<div id='vp_youtube_engine_standin'></div>
		</div>
	);
}

var Youtube = React.createClass({

	mixins: [EngineMixin],

	render: r,

	shouldComponentUpdate: function() {
		return false;
	},

	componentWillUnmount: function() {
		this.stopProgressUpdates();
		this.player.destroy();
	},

	/*
	 * Setup
	 */
	setup: function() {
        if (window.YT && window.YT.loaded) {
            this.setupYoutube();
        } else {	
            window.onYouTubeIframeAPIReady = this.setupYoutube;
            loadScript({url:JS_URL});
        }
	},

	setupYoutube: function() {
        this.player = new window.YT.Player('vp_youtube_engine_standin', {
            height: '100%',
            width: '100%',
            videoId: this.props.source.service_identifier,
            playerVars: {
                controls: "0",
                showinfo: "0",
                wmode: "opaque",
                rel: 0,
                modestbranding: true,
                iv_load_policy: this.props.source.youtube_allow_clickthrough ? 1 : 3,
                cc_load_policy: 0,
                fs: 0,
                html5: 1,
                playsinline: 1
            },
            events: {
                onReady: this.onReady,
                onStateChange: this.onStateChange,
                onError: this.onError
            }
        });
	},

	/* 
	 * Events
	 */
	onReady: function() {
		this.props.onStateChange('ready');
		this.player.setPlaybackQuality('hd720');
		this.startProgressUpdates();
	},

	onStateChange: function(e) {
		switch (e.data) {
            case YT.PlayerState.PAUSED:
                this.props.onStateChange("paused");
                break;
            case YT.PlayerState.ENDED:
                this.props.onStateChange("ended");
                break;
            case YT.PlayerState.BUFFERING:
                this.props.onStateChange("buffering");
                break;
            case YT.PlayerState.PLAYING:
                this.props.onStateChange("playing");
                break;
        }
	},

	onError: function(e) {
		var errorCode = e.data,
			message = 'There was an error playing back this video from YouTube.';
		
		switch(errorCode) {
			case 2:
				message ='This YouTube video ID is invalid.';
				break;
			case 5:
				message ='This YouTube video can not be played on your browser.';
				break;
			case 100:
				message ='This YouTube video was not. It has been removed or has been set to private by the owner.';
				break;
			case 101:
			case 150:
				message = 'There was an error playing back this video from YouTube.';
				break;
		};

		this.props.onStateChange("error", message);
	},

	startProgressUpdates: function() {
		this.progressTimer = setInterval((function(){
			this.props.onBufferChange(this.player.getVideoLoadedFraction());
			this.props.onProgressChange(this.player.getCurrentTime() / this.player.getDuration());
		}).bind(this),200);
	},

	stopProgressUpdates: function() {
		clearInterval(this.progressTimer);
	},

	/*
	 * Commands
	 */
	play: function() {
		this.props.onStateChange('buffering');
		this.player && this.player.playVideo();
	},

	pause: function() {
		this.player && this.player.pauseVideo();
	},

	setProgress: function(value) {
		if (this.player) {
			value = value * this.player.getDuration();
			this.player.seekTo(value);
		}
	},

	setVolume: function(value) {
		this.player.setVolume(value*100.0);
		this.props.onVolumeChange(value);
	}

});

/*
 *	Class
 */
module.exports = Youtube;



