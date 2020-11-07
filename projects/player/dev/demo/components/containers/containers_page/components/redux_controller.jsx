var _ = require('underscore'),
	React = require('react');


var optionsEnv = require('../../../config/environmentOptions'),
	optionsState = require('../../../config/playerStateOptions');

var allOptions = _.extend({}, optionsEnv, optionsState),
	keys = _.keys(allOptions);

function rOption(value,key) {
	var val = '';
	if ( key in optionsEnv) {
		val = this.props.environment[key];
	} else {
		val = this.props.playerState[key];
	}
	return <div key={key} >
		<strong onClick={this.cycleOption.bind(this,key)}>{key}</strong> {val.toString()}
	</div>;

};

function rEnvController() {

	if ( !this.state._envOpen) {
		return <div>Env</div>;
	}

	return <div>	
		{_.map(optionsEnv,this.rOption)}
		<div>Size {this.state.playerHeight + ' x ' + this.state.playerWidth}</div>
	</div>;

};

function rStateController() {
	if ( !this.state._stateOpen) {
		return <div>State</div>;
	}

	return <div>
		{_.map(optionsState,this.rOption)}
	</div>;

};

/*
 *	Template
 */
function r() {

	var Container = this.props.component,
		Component = Container._component,
		mapState = Container._mapState,
		mapDispatch = Container._mapDispatch,
		style = {
			width:'100%', 
			height:'100%',
			backgroundImage:'url('+this.props.compProps.backgroundImage + ')',
			backgroundSize:'cover'
		};

	// inject size of player into environment
	var environment = _.extend({}, this.props.environment, this.state);

	var reduxState = {
		environment: environment,
		playerState: this.props.playerState,
		videoRevision: this.props.compProps.videoRevision,
		theme: this.props.compProps.theme
	};

	var stateProps = mapState(reduxState, {}),
		dispatchProps = mapDispatch(function(action){console.log(action);},{}),
		allProps = _.extend(stateProps, dispatchProps);

	return (
		<div 
			ref = 'outer' 
			style={style}>

			<Component 
				{...allProps}/>

			<div
				onMouseLeave={this.onEnvToggle} 
				onMouseEnter={this.onEnvToggle} 
				className = {'vp_env_controller ' + (this.state._envOpen ? 'vp_open':'')}>
				{this.rEnvController()}
			</div>

			<div
				onMouseEnter={this.onStateToggle}  
				onMouseLeave={this.onStateToggle}
				className= {'vp_state_controller ' + (this.state._stateOpen ? 'vp_open':'')}>
				{this.rStateController()}
			</div>

		</div>
	);
}

/*
 *	Class
 */
var EnvStateController = React.createClass({

	render: r,

	rEnvController: rEnvController,
	rStateController: rStateController,
	rOption:rOption,

	getInitialState:function(){
		return _.extend({
				_envOpen: false,
				_stateOpen: false
			});
	},

	cycleOption: function(optionName, e) {
		e.stopPropagation();

		var currentIndex, nextIndex,values, value;
			

		if ( optionName in optionsEnv) {
			values = optionsEnv[optionName];
			currentIndex = _.indexOf(values, this.props.environment[optionName]);
			nextIndex = (currentIndex + 1) % values.length;
			value = values[nextIndex];
			this.props.onEnvironmentPropChanged(optionName,value);
		}

		if ( optionName in optionsState ) {
			values = optionsState[optionName];
			currentIndex = _.indexOf(values, this.props.playerState[optionName]);
			nextIndex = (currentIndex + 1) % values.length;
			value = values[nextIndex];
			this.props.onPlayerStatePropChanged(optionName,value);
		}
		
	},

	//
	onEnvToggle:function(){
		this.setState({
			_envOpen: !this.state._envOpen
		});
	},

	onStateToggle:function(){
		this.setState({
			_stateOpen: !this.state._stateOpen
		});
	},


	componentDidMount: function() {
		window.addEventListener('resize', this.updatePlayerSize);
		this.updatePlayerSize();
	},

	componentWillUnmount: function() {
		window.removeEventListener('resize', this.updatePlayerSize);
	},

	updatePlayerSize:function() {
		this.setState({
			playerWidth:this.refs.outer.offsetWidth,
			playerHeight:this.refs.outer.offsetHeight
		});
	},


});

module.exports = EnvStateController;