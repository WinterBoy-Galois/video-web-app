var React = require('react'),

	EngineMixin = require('../mixins/engineMixin'),

	$f = require('frogaloop');



/*
 *	Template
 */
function r() {

	var iframeURL = "//player.vimeo.com/video/" + this.props.source.service_identifier + "?api=1";

	return (
		<div className = 'vp_engine_vimeo'>
			<iframe 
				ref='frame'
				src={iframeURL} 
				width="100%" 
				height="100%" 
				frameBorder="0">
			</iframe>
		</div>
	);
	
}

var Vimeo = React.createClass({
	
	mixins: [EngineMixin],

	render: r,

	shouldComponentUpdate: function() {
		return false;
	},

	componentWillUnmount: function() {
		this.player.api('unload');
	},

	/*
	 * Setup
	 */
	setup: function() {
		this.player=$f(this.refs.frame);

		var props = this.props,
			player = this.player,
			ready = false,
			_this = this;

       	player.addEvent("ready", function(args) {

            // prevent a second ready event being fired 
            // this seems to happen if an extra vimeo video is 
            // being loaded in an overlay
            if ( ready ) {
                return;
            }    
            ready = true;


            // need to set volume to 1
            // otherwise it's quite quiet for some reason
            player.api("setVolume", 1);

            player.api('getDuration', function(duration) {
                _this.duration = duration;
            });

            props.onStateChange('ready');

            _this.setupEvents();
        });
	},  
	
	setupEvents: function() {
		var props = this.props,
			player = this.player;
	
        player.addEvent("play", function() {
            props.onStateChange('playing');
        });

        player.addEvent("pause", function() {
            props.onStateChange('paused');
        });

        player.addEvent("finish", function() {
            props.onStateChange("ended");
        });

        player.addEvent("loadProgress", function(data) {
            props.onBufferChange(data.percent);
        });

        player.addEvent("playProgress", function(data) {
            props.onProgressChange(data.percent);
        });

	},

	/*
	 * Commands
	 */
	play: function() {
		this.props.onStateChange('buffering');
		this.player && this.player.api('play');
	},

	pause: function() {
		this.player && this.player.api('pause');
	},

	setProgress: function(value) {
		if (this.player) {
			value *= this.duration;
			this.player.api("seekTo", value);
		}
	},

	setVolume: function(value) {
		this.player.api("setVolume", value);
		this.props.onVolumeChange(value);
	}
	
});

/*
 *	Class
 */
module.exports = Vimeo;



