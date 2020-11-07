require('css/components/marker.scss');

var React = require('react'),
	PureRenderMixin = require('react-addons-pure-render-mixin'),
	Fader = require('components/fader'),
	ClickHint = require('components/clickHint');

/*
 *	Template
 */
function r() {

	var className = 
		"vpp_marker vp_size_" + this.props.size + 
		(this.state.down ? ' vp_down ' : '') +
		(this.state.over?' vp_hover ':' ') +
		(this.props.className ? this.props.className:'');

	var highlighted = this.state.over || this.props.highlighted;

	var textColor = highlighted ? this.props.activeTextColor : this.props.textColor,
		backgroundColor = highlighted ? this.props.activeBackgroundColor : this.props.backgroundColor,
		outlineColor = highlighted ? this.props.activeOutlineColor : this.props.outlineColor;

	return (
		<div 
			onClick={this.onClick} 
			onMouseEnter={this.onMouseEnter}
			onMouseLeave={this.onMouseLeave}
			onMouseDown={this.onMouseDown}
			onMouseUp={this.onMouseUp}
			className = {className}
			style={this.props.style}>
			<div className = 'vp_marker_tip'>
	        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0" y="0" viewBox="0 0 16 32">
	            <polyline
	            	style={{stroke:outlineColor}}
	            	points="16,0 15,0 3,16 15,32 16,32"/>
	            <polygon 
	            	style={{fill:backgroundColor}}
	            	points="16,0 15,0 3,16 15,32 16,32"/>
	        </svg>
	        </div>
			<div
				style={{color:textColor, borderColor:outlineColor, backgroundColor:backgroundColor}} 
				className="vp_marker_body">
				<div ref='title' className = "vp_title">{this.props.title}</div>
			</div>
			<Fader showing={this.props.showClickHint}>
				<ClickHint color={this.props.clickHintColor}/>
			</Fader>
		</div>);
}

var Marker = React.createClass({

	mixins: [PureRenderMixin],

	render: r,

	onClick: function(e){
		this.props.onClick && this.props.onClick(e);
	},

	onMouseDown: function() {
		this.setState({down:true});
	},

	onMouseUp: function() {
		this.setState({down:false});
	},

	onMouseEnter: function(){
		this.setState({over:true});
	},

	onMouseLeave: function(){
		this.setState({over:false});
	},

	getDefaultProps: function() {
	    return {
	      size: 'normal'
	    };
  	},

  	getInitialState: function() {
  		return {
  			over:false,
  			down:false
  		};
  	},

  	getTextWidth: function() {
  		return this.refs.title.offsetWidth;
  	},

	propTypes: {

		title:React.PropTypes.node,
		size: React.PropTypes.oneOf(['normal','medium','small', 'tiny']).isRequired,
		highlighted:React.PropTypes.bool,
		
		backgroundColor: React.PropTypes.string,
		textColor: React.PropTypes.string,
		outlineColor: React.PropTypes.string,

		activeBackgroundColor: React.PropTypes.string,
		activeTextColor: React.PropTypes.string,
		activeOutlineColor: React.PropTypes.string,

		showClickHint: React.PropTypes.bool
	},

});



/*
 *	Class
 */
module.exports = Marker;



