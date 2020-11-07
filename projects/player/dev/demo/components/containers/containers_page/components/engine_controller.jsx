var React = require('react');

/*
 *	Template
 */
function r() {

	var _this = this,
		Component = this.props.component;

	function setState(key, value) {
		var obj={};
		obj[key] = value;
		this.setState(obj);
	}

	function play() {
		this.refs.engine.play();
	}

	function pause() {
		this.refs.engine.pause();
	}

	function setVolume(val) {
		this.refs.engine.setVolume(val);
	}

	function setProgress(val) {
		this.refs.engine.setProgress(val);
	}

	function onPlaybarClick(e) {
		var val = (e.pageX-e.currentTarget.getBoundingClientRect().left) / e.currentTarget.getBoundingClientRect().width;
		this.refs.engine.setProgress(val);
	}

	return (
		<div style={{width:'100%', height:'100%'}}>
			<Component 
				{...this.props.compProps}
				ref='engine'
				key={this.props.compProps.source.service}
				onStateChange={setState.bind(this,'playerState')}
				onVolumeChange={setState.bind(this,'volume')}
				onProgressChange={setState.bind(this,'progress')}
				onBufferChange={setState.bind(this,'buffer')}
				/>
			<div className='vp_engine_controller'>
				<div className='vp_demo_playbar' onMouseUp={onPlaybarClick.bind(this)}>
					<div className='vp_buffer' style={ {width:this.state.buffer * 100 +'%'} }>
					</div>
					<div className='vp_play' style={ {width:this.state.progress * 100 +'%'} }>
					</div>
				</div>
				<div>
					<span><a onClick={play.bind(this)}>Play</a> </span> 
					<span><a onClick={pause.bind(this)}>Pause</a> </span> 
					<span><a onClick={setVolume.bind(this, 0)}>Mute</a> </span> 
					<span><a onClick={setVolume.bind(this,1)}>Unmute</a> </span> 
				</div>
				<div>
					<span>Progress: {Math.floor(100*this.state.progress)+''} </span> 
					<span>Buffer: {Math.floor(100*this.state.buffer) + '%'} </span> 
					<span>Volume: {this.state.volume} </span> 
					<span>State: {this.state.playerState} </span>
				</div>
			</div>
		</div>
	);
}

/*
 *	Class
 */
var EngineController = React.createClass({
	render: r,
	getInitialState:function(){
		return {};
	}
});

module.exports = EngineController;