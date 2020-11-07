var _ = require('underscore'),
	React = require('react'),

	EngineMixin = require('../mixins/engineMixin'),
	// allows merging of code for our videojs and brightcove videojs
	VideojsMixin = require('../mixins/videojsMixin'),

	loadScript = require('../util/loadScript');


/*
 *	Template
 */
function r() {

	var id = this.getID();

	return (
		<div className = 'vp_engine_brightcove'>
			<video
			  data-video-id={id.video_id}
			  data-account={id.account}
			  data-player={id.player}
			  data-embed="default"
			  className="video-js" 
			  id = "brightcove"></video>
		</div>
	);
	
}

var VideoEngine = React.createClass({

	mixins: [VideojsMixin, EngineMixin],

	render: r,

	shouldComponentUpdate: function() {
		return false;
	},

	getID: function() {
        var s = this.props.source.service_identifier;
        if (_.isObject(s)) return s;
        return JSON.parse(s);
    },

	componentWillUnmount: function() {
		this.player && this.player.dispose();
		delete window.videojs;		
	},

	/*
	 * Setup
	 */
	setup: function() {

		var id = this.getID(),
			url = '//players.brightcove.net/' + id.account + '/' + id.player + '_default/index.min.js',
			_this = this;

		loadScript({
			url:url,
			waitFor: 'videojs'
		}, function(){
			window.videojs('brightcove').ready(function(){
				_this.player = this;
				_this.props.onStateChange('ready');
				_this.setupEvents();
			},50);
		});

	}
});

/*
 *	Class
 */
module.exports = VideoEngine;



