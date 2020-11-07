var _ = require('underscore'),
	React = require('react');


/*
 *	Template
 */
function r() {

	var allProps = _.extend(this.props.compProps, {playerWidth:this.state.playerWidth, playerHeight:this.state.playerHeight}),
		Component = this.props.component;

	var style = {
			width:'100%', 
			height:'100%',
			backgroundImage:'url('+this.props.compProps.backgroundImage + ')',
			backgroundSize:'cover'
		};

	return (
		<div 
			ref = 'outer' 
			style={style}>

			<Component 
				{...allProps}/>

		</div>
	);
}

/*
 *	Class
 */
var EnvStateController = React.createClass({

	render: r,

	getInitialState: function() {
 		return {};
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