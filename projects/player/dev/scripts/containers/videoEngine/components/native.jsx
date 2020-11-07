var React = require('react'),
	
	EngineMixin = require('../mixins/engineMixin');


var ASSUME_LOADING_DELTA = 0.1,
	ASSUME_PLAYING_DELTA = 0.02;

/*
 *	Template
 */
function r() {

	return (
		<div className = 'vp_engine_native'>
			<video 
				ref='video'
				className = 'vp_engine_native_video_container'
				preload="metadata" 
				width="100%" 
				height="100%"
				onPlaying={this.onPlaying}
				onPause={this.onPause}
				onEnded={this.onEnded}
				onTimeUpdate={this.onTimeUpdate}
				onProgress = {this.onProgress}
				onClick={this.onClick}
				>
				<source 
					src={this.props.source.file_mp4} 
					type='video/mp4' />
 				<source 
 					src={this.props.source.file_webm} 
 					type='video/webm' />
			</video>
		</div>
	);
	
}

var VideoEngine = React.createClass({

	mixins: [EngineMixin],

	render: r,

	getInitialState: function() {
		return {
			lastState:'ready',
			lastCurrentTime:0
		};
	},

	shouldComponentUpdate: function() {
		return false;
	},

	componentWillUnmount: function() {
		clearInterval(this.iv);
	},

	componentDidMount: function() {
		this.iv = setInterval(this.onStateUpdate, 200);

		// add non standard attributes...
		this.refs.video.setAttribute('playsinline', true);
		this.refs.video.setAttribute('webkit-playsinline', true);
	},

	setup:function() {
		this.updatePlayerState('ready');
	},	

	updatePlayerState: function(state) {
		this.props.onStateChange(state);
		this.setState({
			lastState:state
		});
	},

	/*
	 * Events
	 */
	onTimeUpdate: function() {
		var progress = this.refs.video.currentTime / this.refs.video.duration;
		progress = isNaN(progress) ? 0 : progress;
        this.props.onProgressChange(progress > 1 ? 1 : progress);
	},

	onPause: function() {
		this.updatePlayerState('paused');
	},

	onPlaying: function() {
		this.updatePlayerState('playing');
	},

	onEnded: function() {
		this.updatePlayerState('ended');
	},

	// find the current bufferprogress item
	// and report ending of this
	onProgress: function() {
		var buff = this.refs.video.buffered,
			currentTime = this.refs.video.currentTime,
			duration = this.refs.video.duration;
		for (var i=0; i<buff.length; i++) {
			if (buff.start(i) <= currentTime && buff.end(i) > currentTime) {
				this.props.onBufferChange(buff.end(i)/duration);
				return;
			}
	    }
	    this.props.onBufferChange(currentTime/duration);
	},

	onClick: function() {
		switch(this.state.lastState) {
		    case 'ready':
		    case 'paused':
		    case 'ended':
		    	this.play();
		        break;
		    case 'playing':
		    case 'buffering':
		    	this.pause();
		        break;
		}
	},

	// we need to manually decide wether the player is buffering
	// as we don't get reliable info from the element itself
	onStateUpdate: function() {
		var currentTime = this.refs.video.currentTime,
			delta = Math.abs(this.state.lastCurrentTime - currentTime);
        if (delta >= ASSUME_LOADING_DELTA && this.state.lastState == "buffering") {
            this.updatePlayerState("playing");
        } else if (delta < ASSUME_PLAYING_DELTA && this.state.lastState == "playing") {
            this.updatePlayerState("buffering");
        }
        this.setState({
        	lastCurrentTime: currentTime
        });
	},

	/*
	 * Commands
	 */
	play: function() {
		this.updatePlayerState('buffering');
		this.refs.video.play();
	},

	pause: function() {
		this.refs.video.pause();
	},

	setProgress: function(value) {
		this.refs.video.currentTime = value * this.refs.video.duration;
	},

	setVolume: function(value) {
		this.refs.video.volume = value;
		this.props.onVolumeChange(value);
	}
	
});

/*
 *	Class
 */
module.exports = VideoEngine;



