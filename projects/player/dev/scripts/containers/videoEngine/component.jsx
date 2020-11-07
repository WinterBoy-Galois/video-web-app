require('css/containers/videoEngine.scss');


var React = require('react'),
	
	calculateAspect = require('util/calculateAspectMetrics'),

	ResizeMixin = require('./mixins/resizeMixin'),
	PureRenderMixin = require('react-addons-pure-render-mixin');

var engines = {
	'youtube': require('./components/youtube'),
	'vimeo': require('./components/vimeo'),
	'wistia': require('./components/wistia'),
	'brightcove': require('./components/brightcove'),
	'videojs': require('./components/native'),
	'videopath': require('./components/native'),
	'custom': require('./components/native'),
	'sprites': require('./components/sprites'),
	'dummy': require('./components/dummy'),
	'kaltura': require('./components/kaltura'),
	'ooyala': require('./components/ooyala'),
	'movingimages': require('./components/movingimages'),
	'bitmovin': require('./components/bitmovin')
};

/*
 *	Template
 */
function r() {
	var service = this.props.service || this.props.source.service;

	var Component = engines[service],
		style = {};

	if ( this.props.mobilePortraitUI ) {
		style = {
			bottom:'auto',
			height:this.state.width / this.props.source.aspect
		};

	} else {
		style = calculateAspect(this.state.width, this.state.height, this.props.source.aspect, this.props.fit);
	}

	return (
		<div ref='outer' className = 'vp_engine'>
			<div style = {style} className = 'vp_engine_resizer'>
				<Component 
					ref='inner'
					{...this.props}
					source={this.props.source} 
					key={this.props.source.service_identifier} // force reloading of engine implementation when source changes
					onProgressChange={this.props.onProgressChange}
					onBufferChange={this.props.onBufferChange}/>
			</div>
		</div>);
}

var VideoEngine = React.createClass({

	mixins: [PureRenderMixin],

	render: r,

	play: function(){
		this.refs.inner.play();
	},
	pause: function(){
		this.refs.inner.pause();
	},
	setVolume: function(val){
		this.refs.inner.setVolume(val);
	},
	setProgress: function(val){
		this.refs.inner.setProgress(val);
	},

	componentDidMount:function(){
		this.processedCommands = 0;
		this.updateSize();
		this.sizeInterval = setInterval(this.updateSize, 200);
	},

	componentWillUnmount: function() {
		clearInterval(this.sizeInterval);
	},


	getInitialState: function(){
		return {
			width:768,
			height:512
		};
	},

	updateSize: function() {
		var newWidth = this.refs.outer.offsetWidth,
			newHeight = this.refs.outer.offsetHeight;

		if ( this.state.width != newWidth || this.state.height != newHeight ) {
			this.setState({
				width:this.refs.outer.offsetWidth,
				height:this.refs.outer.offsetHeight
			});
		}
	},


	/* 
	 *	Map engine commands array to actual events
	 */
	componentWillReceiveProps: function(props) {
		if (!props.engineCommands) return;
		while (props.engineCommands.length > this.processedCommands ) {
			var command = props.engineCommands[this.processedCommands];
			this.processedCommands++;
			switch(command.action) {
				case 'play':
					this.play();
					break;
				case 'pause':
					this.pause();
					break;
				case 'setProgress':
					this.setProgress(command.value);
					break;
				case 'setVolume': 
					this.setVolume(command.value);
					break;
			}
		}
	},
	
	propTypes: {
		fit:React.PropTypes.bool,
		source:React.PropTypes.object.isRequired,
		onStateChange: React.PropTypes.func.isRequired,
		onVolumeChange: React.PropTypes.func.isRequired,
		onProgressChange: React.PropTypes.func.isRequired,
		onBufferChange: React.PropTypes.func.isRequired,
		onDurationChange: React.PropTypes.func.isRequired
	},



});

/*
 *	Class
 */
module.exports = VideoEngine;



