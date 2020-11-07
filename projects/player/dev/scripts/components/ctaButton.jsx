require('css/components/ctaButton.scss');

var _ = require('underscore'),
	colors = require('config/ui').colors,
	React = require('react'),
	tinycolor = require('tinycolor'),
	PureRenderMixin = require('react-addons-pure-render-mixin');

/*
 *	Template
 */
function r() {

	var color = this.props.color,
		textColor = this.props.textColor,
		overColor;

	if ( color in colors ) {
		color = colors[color];
	}

	if (!textColor) {
		textColor =  tinycolor(color).isLight() ? '#222' : '#eee';
	}

	var style = {
		backgroundColor:this.state.over ? tinycolor(color).darken(10).toString() : color,
		color: textColor
	};

	var className = 'vpp_cta_button ' + (this.state.over ? 'vpp_over' : '');

	return (
		<div
			onClick={this.props.onClick}
			onMouseEnter={this.onMouseEnter}
			onMouseLeave={this.onMouseLeave} 
			style={style} 
			className = {className}>
			{this.props.title}
		</div>
	);
}

var ControlButton = React.createClass({

	mixins: [PureRenderMixin],

	render: r,

	onClick: function(){
		this.props.onClick && this.props.onClick();
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
  			over:false
  		};
  	},

  	getDefaultProps: function() {
  		return {
  			color:'#273a45'
  		};
  	},

	propTypes: {
		color: React.PropTypes.string,
		textColor: React.PropTypes.string,
		title: React.PropTypes.string,
	},

});


/*
 *	Class
 */
module.exports = ControlButton;


