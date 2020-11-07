require('css/components/controlButton.scss');

var _ = require('underscore'),
	tinycolor = require('tinycolor'),
	React = require('react'),
	PureRenderMixin = require('react-addons-pure-render-mixin'),
	Icon = require('./icon');

/*
 *	Template
 */
function r() {

	var backgroundColor = this.props.backgroundColor,
		activeBackgroundColor = this.props.activeBackgroundColor,
		textColor = this.props.textColor,
		activeTextColor = this.props.activeTextColor;

	if ( this.props.color ) {
		var color = tinycolor(this.props.color);
		backgroundColor = this.props.color;
		activeBackgroundColor = backgroundColor;
		textColor = color.isLight() ? '#333' : '#ddd';
		activeTextColor = textColor;
	}


	var style = _.extend({},{
		backgroundColor:this.state.over ? activeBackgroundColor : backgroundColor
	}, this.props.style);

	var textColor = this.state.over ? activeTextColor : textColor;

	// build icon
	var icon = false;
	if ( this.props.type == 'custom') {
		icon = <img src={this.props.iconURL} className='vpp_custom_icon' />;
	} else {
		icon = <Icon type={this.props.type} color={textColor} />;
	}

	var className = 'vpp_control_button ' 
		+ (this.state.over ?  'vpp_highlighted ' : '')
		+ (this.state.down ? 'vpp_down ' : '')
		+ this.props.className;

	return (
		<div 
			onClick={this.onClick}
			onMouseEnter={this.onMouseEnter}
			onMouseLeave={this.onMouseLeave}
			onMouseDown={this.onMouseDown}
			onMouseUp={this.onMouseUp}
			style = {style}
			className={className} > 
			{icon}
		</div>
	);
}

var ControlButton = React.createClass({

	mixins: [PureRenderMixin],

	render: r,

	onClick: function(){
		this.props.onClick && this.props.onClick();
	},

	onMouseDown: function() {
		this.setState({
			down:true
		});
	},

	onMouseUp: function() {
		this.setState({
			down:false
		});
	},

	onMouseEnter: function(){
		this.setState({
			over:true
		});
	},

	onMouseLeave: function(){
		this.setState({
			over:false
		});
	},

  	getInitialState: function() {
  		return {
  			over:false,
  			down: false
  		};
  	},

  	getDefaultProps: function(){
  		return {
  			style:{},
  			className: ''
  		};
  	},

	propTypes: {
		type:React.PropTypes.oneOf(Icon.TYPES.concat(['custom'])),

		backgroundColor: React.PropTypes.string,
		textColor: React.PropTypes.string,

		activeBackgroundColor: React.PropTypes.string,
		activeTextColor: React.PropTypes.string,

		className: React.PropTypes.string,
	},

});

ControlButton.TYPES = Icon.TYPES;



/*
 *	Class
 */
module.exports = ControlButton;


