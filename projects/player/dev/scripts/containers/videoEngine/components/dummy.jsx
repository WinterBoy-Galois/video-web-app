var React = require('react'),
	EngineMixin = require('../mixins/engineMixin');



var FRAME_MS = 250;

// delay tasks
// but only one at a time
var delayHandle;
function delayTask(task, scope) {
    clearTimeout(delayHandle);
    setTimeout(task.bind(scope), Math.random() * 250 + 250);
}

/*
 *	Template
 */
function r() {

	return (
		<div className = 'vp_engine_dummy'>
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
		this.stopFakeFrames();
	},

	getInitialState: function() {
		return {
			buffer:0,
			progress:0,
			playing:false,
			volume:0
		};
	},

	/*
	 * Setup
	 */
	setup: function() {
		this.props.onStateChange('ready');
		this.setState({playing:false});
		this.startFakeFrames();
	},

	startFakeFrames: function(){
		this.fakeFramesInterval = setInterval( (function(){

			var speed = 1 / this.props.source.duration * FRAME_MS / 1000;

			// simulate playing
			if ( this.state.playing ) {
				this.setState({
					progress: this.state.progress + speed
				});
			}

			// simulate ended
			if (this.state.progress >= 1) {
				this.setState({
					playing:false,
					progress:1
				});
				this.props.onStateChange('ended');
			}

			// simulate buffering
			var newBuffer = this.state.buffer + speed * 1.3;
			this.setState({
				buffer: newBuffer <= 1 ? newBuffer : 1
			});

			this.props.onBufferChange(this.state.buffer);
			this.props.onProgressChange(this.state.progress);

		}).bind(this), FRAME_MS);
	},

	stopFakeFrames: function() {
		clearInterval(this.fakeFramesInterval);
	},

	/*
	 * Commands
	 */
	play: function() {
		this.props.onStateChange('buffering');
		delayTask(function(){
			this.props.onStateChange('playing');
			this.setState({playing:true});
		}, this);
	},

	pause: function() {
		this.props.onStateChange('paused');
		this.setState({playing:false});
	},

	setProgress: function(value) {
		this.setState({
			progress:value
		});
	},

	setVolume: function(value) {
		this.setState({
			volume:value
		});
		this.props.onVolumeChange(value);
	}

});

/*
 *	Class
 */
module.exports = Dummy;



