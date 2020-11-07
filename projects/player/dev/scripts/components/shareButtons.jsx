require('css/components/shareButtons.scss');

var _ = require('underscore'),
	React = require('react'),
	SERVICES = _.keys(require('const').SHARING),
	PureRenderMixin = require('react-addons-pure-render-mixin'),
	ControlButton = require('./controlButton');

/*
 *	Template
 */
function r() {

	/*
	 * Render service buttons
	 */
	var offset = 0,
		props = this.props,
		state = this.state,
		style;
	var buttons = _.map(this.props.enabledServices, function(service, index){
		if (state.opened) offset+=40;

		style = {
			transform:'translate(0px,'+offset+'px)',
			zIndex:10-index
		};

		var clickHandler = props.onServiceSelected ? props.onServiceSelected.bind(null,service) : false;

		return <ControlButton 
					{...props}
					onClick={clickHandler}
					key={service}
					style={style}
					type={service.toLowerCase()}/>;
	});


	/*
	 * Render main button
	 */ 
	style = {
		zIndex:50,
	};
	var mainButton = <ControlButton 
						backgroundColor={this.props.backgroundColor}
						textColor={this.props.textColor}
						activeBackgroundColor={this.props.backgroundColor}
						activeTextColor={this.props.textColor}
						style={style}
						type='share'/>;


	return (
		<div
			className='vpp_share_buttons'
			onMouseEnter={this.onMouseEnter}
			onMouseLeave={this.onMouseLeave} 
			onMouseMove={this.onMouseMove}
			style={this.props.style}>
			{mainButton}
			{buttons}
		</div>
	);
}

var ShareButtons = React.createClass({

	mixins: [PureRenderMixin],

	render: r,

	componentWillUnmount: function() {
		this.clearCloseTimeout();
	},

	onClick: function(){
		this.props.onClick && this.props.onClick();
	},

	onMouseEnter: function(){
		this.setState({
			opened:true
		});
		this.setCloseTimeout();
	},

	onMouseLeave: function(){
		this.setState({
			opened:false
		});
	},

	onMouseMove: function(){
		this.setCloseTimeout();
	},

  	getInitialState: function() {
  		return {
  			opened:false
  		};
  	},

  	getDefaultProps: function(){
  		return {
  			enabledServices: SERVICES
  		};
  	},

  	clearCloseTimeout: function(){
  		clearTimeout(this.closeTimeout);
  	},

  	setCloseTimeout: function() {
  		this.clearCloseTimeout();
  		var _this = this;
  		this.closeTimeout = setTimeout(function(){
  			_this.setState({opened:false});
  		},2000);
  	},

	propTypes: {
		backgroundColor: React.PropTypes.string,
		textColor: React.PropTypes.string,

		activeBackgroundColor: React.PropTypes.string,
		activeTextColor: React.PropTypes.string,

		enabledServices: React.PropTypes.array,

	},

});


/*
 *	Class
 */
module.exports = ShareButtons;



