var React = require('react'),
	EngineMixin = require('../mixins/engineMixin'),
	scriptjs = require('scriptjs');


var JS_URL = 'http://cdnapi.kaltura.com/p/{{partner_id}}/sp/{{partner_id}}00/embedIframeJs/uiconf_id/{{uiconf_id}}/partner_id/{{partner_id}}';

/*
 *	Template
 */
function r() {

	return (
		<div ref = 'player' id = 'vp_engine_kaltura' className = 'vp_engine_kaltura'>
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
		if ( window.kWidget ) {
			window.kWidget.destroy('vp_engine_kaltura');
		}
	},

	/*
	 * Setup
	 */
	setup: function() {

		var _this = this,
			opts = this.props.source.service_identifier,
			url = JS_URL.replace(/{{partner_id}}/g, opts.partner_id).replace(/{{uiconf_id}}/g, opts.uiconf_id);

		if (window.kWidget ) {
			this.embedPlayer();
        } else {
        	scriptjs(url, function(){
        		_this.embedPlayer();
        	});
        }
	},

	embedPlayer: function() {
		var opts = this.props.source.service_identifier;

		window.kWidget.embed({
			"targetId": "vp_engine_kaltura",
			"wid": "_" + opts.partner_id,
			"uiconf_id": opts.uiconf_id,
			"flashvars": {
				"streamerType": "auto",
				'controlBarContainer.plugin': false,
				'largePlayBtn.plugin': false,
				'loadingSpinner.plugin': false
				},
			"entry_id": opts.entry_id,
			readyCallback: this.onReady
		});
	},

	onReady: function() {
		this.player = document.getElementById('vp_engine_kaltura');

		/*
		 * Events
		 */
		var _this = this;
		this.player.kBind("playerStateChange", function( data ){
			if (data == 'ready') {
				_this.props.onStateChange('ready');
			}
			else if (data == 'playing') {
				_this.props.onStateChange('playing');
			}
			else if (data == 'paused') {
				_this.props.onStateChange('paused');
			}
		});

		this.player.kBind("seek", function( data ){
			_this.props.onStateChange('buffering');
		});

		this.player.kBind("playbackComplete", function( data ){
			_this.props.onStateChange('ended');
		});

		this.player.kBind("playerUpdatePlayhead", function( data ){
			var seconds = data,
				duration = _this.player.evaluate('{duration}');
			_this.props.onProgressChange(seconds/duration);
		});

		this.player.kBind("volumeChanged", function( data ){
			_this.props.onVolumeChange(data.newVolume);
		});

		this.player.kBind("bufferProgress", function( data ){
			var seconds = data.newTime,
				duration = _this.player.evaluate('{duration}');
			_this.props.onBufferChange(seconds/duration);
		});

		
	},


	/*
	 * Commands
	 */
	play: function() {
		this.props.onStateChange('buffering');
		this.player.sendNotification('doPlay');
	},

	pause: function() {
		this.player.sendNotification('doPause');
	},

	setProgress: function(value) {
		var seconds = value * this.player.evaluate('{duration}');
		this.player.sendNotification('doSeek', seconds);
	},

	setVolume: function(value) {
		this.player.sendNotification('changeVolume', value);
	}

});

/*
 *	Class
 */
module.exports = Dummy;



