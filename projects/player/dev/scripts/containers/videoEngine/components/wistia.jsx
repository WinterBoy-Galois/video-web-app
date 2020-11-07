var _ = require('underscore'),
	React = require('react'),

	EngineMixin = require('../mixins/engineMixin'),

	loadScript = require('../util/loadScript');

var	IFRAME_URL = '//fast.wistia.net/embed/iframe/',
	JS_URL = '//fast.wistia.com/assets/external/E-v1.js';

var URL_ARGS = {
    videoFoam: false,
    stillUrl: '',
    vmode: 'transparent',
    autoplay: false,
    chromeless: true,
    controlsVisibleOnLoad: false,
    fullscreenButton: false,
    playbar: false,
    playButton: false,
    smallPlayButton: false,
    volumeControl: false,
    volume: 1,
    playerColor: 'rgba(0,0,0,0.0)',

    // disable plugins
    'plugin%5Bsocialbar-v1%5D%5Bon%5D': false,
    'plugin%5BpostRoll-v1%5D%5Bon%5D': false,
    'plugin%5BrequireEmail-v1%5D%5Bon%5D': false,
};

var argsString = _.reduce(URL_ARGS, function(memo, value, key){
	return memo + key+ '=' + value + '&';
}, '?');


/*
 *	Template
 */
function r() {

	var iframeURL = IFRAME_URL + this.props.source.service_identifier + argsString;
	return (
		<div className = 'vp_engine_wistia'>
			<iframe 
				id = 'vp_engine_wistia_frame'
				className="wistia_embed"
				ref='frame'
				src={iframeURL} 
				width="100%" 
				height="100%" 
				frameBorder="0" />
		</div>
	);
	
}

var VideoEngine = React.createClass({

	mixins: [EngineMixin],

	render: r,

	shouldComponentUpdate: function() {
		return false;
	},

	componentWillUnmount: function() {
		this.player.remove();
	},

	/*
	 * Setup
	 */
	setup: function() {

    	// push handle
    	window._wq = window._wq || [];
    	_wq.push({ "vp_engine_wistia_frame": (function(player) {
    			this.player = player;
  				this.props.onStateChange('ready');
  				this.setupEvents();
			}).bind(this)
		});

		// load wistia lib
		loadScript({url:JS_URL});
	},

	setupEvents: function() {

		var props = this.props,
			player = this.player,
			waiting = false;

		player.bind('play', function(){
			props.onStateChange('playing');
		});

		player.bind('pause', function(){
			props.onStateChange('paused');
		});

		player.bind('end', function(){
			props.onStateChange('ended');
		});

		player.bind('timechange', function(secs) {
            props.onProgressChange(secs / player.duration());
            if (waiting) {
                waiting = false;
                props.onStateChange('playing');
            }
        });

        player.bind('waiting', function() {
            waiting = true;
            props.onStateChange('buffering');
        });

        player.bind('seek', function(secs) {
            props.onProgressChange(secs / player.duration());
        });
		
	},

	/*
	 * Commands
	 */
	play: function() {
		this.props.onStateChange('buffering');
		this.player && this.player.play();
	},

	pause: function() {
		this.player && this.player.pause();
	},

	setProgress: function(value) {
		if (this.player) {
			value = value * this.player.duration();
			this.player.time(value);
		}
	},

	setVolume: function(value) {
		this.player.volume(value);
		this.props.onVolumeChange(value);
	}


});

/*
 *	Class
 */
module.exports = VideoEngine;



