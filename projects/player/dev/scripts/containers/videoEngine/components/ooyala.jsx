var React = require('react'),
	EngineMixin = require('../mixins/engineMixin'),
	scriptjs = require('scriptjs');

var JS_URLS = [
		'//player.ooyala.com/static/v4/stable/latest/core.min.js',
		'//player.ooyala.com/static/v4/stable/latest/video-plugin/main_html5.min.js',
		'//player.ooyala.com/static/v4/stable/latest/video-plugin/bit_wrapper.min.js'];



/*
 *	Template
 */
function r() {

	return (
		<div id = 'vp_engine_ooyala' className = 'vp_engine_ooyala'>
		</div>
	);
	
}

var Dummy = React.createClass({
	
	render: r,

	mixins: [EngineMixin],

	shouldComponentUpdate: function() {
		return false;
	},

	componentWillUnmount: function() {
		this.player.destroy();
	},

	/*
	 * Setup
	 */
	setup: function() {
		var _this = this;
		if (window.OO && window.OO.ready) {
            OO.ready(_this.createPlayer);
        } else {	

        	var load = function(index) {
        		if ( index == JS_URLS.length ) {
        			OO.ready(_this.createPlayer);
        			return;
        		}
        		scriptjs(JS_URLS[index], load.bind(null, index+1));
        	};

        	load(0);
        }
	},

	createPlayer: function() {
		var opts = this.props.source.service_identifier;
		
		var playerParam = {
			pcode:opts.pcode,
			playerBrandingId:opts.playerBrandingId,
			layout: "chromeless",
			skin: {'config': '//player.ooyala.com/static/v4/stable/latest/skin-plugin/skin.json'},
			onCreate: this.onCreated
		};

		OO.Player.create(
			'vp_engine_ooyala',
			opts.embedCode,
			playerParam
		);

	},

	onCreated: function(player) {
		this.player = player;

		/*
		 * register events
		 */
		var _this = this;
		this.player.mb.subscribe('playbackReady', 'videopath', function(){
			_this.props.onStateChange('ready');
		});

		this.player.mb.subscribe('playheadTimeChanged', 'videopath', function(event, seconds, duration, buffered){
			_this.props.onProgressChange(seconds/duration);
			_this.props.onBufferChange(buffered/duration);
		});

		this.player.mb.subscribe('playing', 'videopath', function(){
			_this.props.onStateChange('playing');
		});

		this.player.mb.subscribe('videoPause', 'videopath', function() {
			_this.props.onStateChange('paused');
		});

		this.player.mb. subscribe('changeVolume', 'videopath', function(event, volume) {
			_this.props.onVolumeChange(volume);
		});	

		this.player.mb. subscribe('videoPlayed', 'videopath', function(event, volume) {
			_this.props.onStateChange('ended');
		});	

		this.player.mb. subscribe('videoPlayed', 'videopath', function(event, volume) {
			_this.props.onStateChange('ended');
		});	

		this.player.mb.subscribe('buffering', 'videopath', function(){
			_this.props.onStateChange('buffering');
		});

		this.player.mb.subscribe('buffered', 'videopath', function(){
			_this.props.onStateChange('playing');
		});

		
	},

	/*
	 * Commands
	 */
	play: function() {
		this.props.onStateChange('buffering');
		this.player.play();
	},

	pause: function() {	
		this.player.pause();
	},

	setProgress: function(value) {
		var duration = this.player.getDuration();
		this.player.seek(duration * value);
	},

	setVolume: function(value) {
		this.player.setVolume(value);
	}

});

/*
 *	Class
 */
module.exports = Dummy;



