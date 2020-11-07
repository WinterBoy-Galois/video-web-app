var React = require('react'),
	scriptjs = require('scriptjs'),
	EngineMixin = require('../mixins/engineMixin');


var JS_URL = 'https://bitmovin-a.akamaihd.net/bitdash/stable/bitdash.min.js';

/*
 *	Template
 */
function r() {

	return (
		<div className = 'vpp_engine_bitmovin' id = 'bitmovin' >
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

	},	

	componentWillUnmount: function() {
		if ( this.player ) this.player.destroy();
		this.player = false;
	},


	setup: function() {
		var _this = this;
		if ( window.bitdash ) {
			this.initPlayer();
		} else {
			scriptjs(JS_URL, function(){
        		_this.initPlayer();
        	});
		}
	},

	initPlayer: function() {
		var _this = this,
			opts = this.props.source.service_identifier;

		this.player = window.bitdash('bitmovin');
		
		var conf = {
			key: opts.key,
			source: {
				dash: opts.dash,
				hls:opts.hls
			},
			style: {
				width: '100%',
				controls:false
			},
			events: {
				onReady:this.onReady,
				onPlay: this.onPlay,
				onPause: this.onPause,
				onVolumeChange: this.onVolumeChange,
				onTimeChanged: this.onTimeChanged,
				onPlaybackFinished: this.onPlaybackFinished,
				onStartBuffering: this.onStartBuffering,
				onStopBuffering: this.onStopBuffering
			}
		};

		this.player.setup(conf).then(function(){
		}, function(reason){
			_this.props.onStateChange("error", reason);
		});
	},

	onReady: function() {
		this.props.onStateChange('ready');
	},

	onPlay: function() {
		this.props.onStateChange('playing');
	},

	onPause: function() {
		this.props.onStateChange('paused');
	},

	onStartBuffering: function() {
		this.props.onStateChange('buffering');
	},

	onStopBuffering: function() {
		this.props.onStateChange('playing');
	},


	onTimeChanged: function(vals) {
		var progress = vals.time / this.player.getDuration(),
			buffer = ( this.player.getVideoBufferLength() + vals.time ) / this.player.getDuration();
		this.props.onProgressChange(progress);
		this.props.onBufferChange(buffer);
	},


	onPlaybackFinished: function() {
		this.props.onEnded();
	},

	// Commands
	play: function() {
		this.player.play();
	},

	pause: function() {
		this.player.pause();
	},

	setProgress: function(value) {
		var seconds = this.player.getDuration() * value;
		this.player.seek(seconds);
	},

	setVolume: function(value) {
		var bmValue = value == 0 ? 0.01 : 100;
		this.player.setVolume(bmValue);
		this.props.onVolumeChange(value);

	}

	
});

/*
 *	Class
 */
module.exports = VideoEngine;



