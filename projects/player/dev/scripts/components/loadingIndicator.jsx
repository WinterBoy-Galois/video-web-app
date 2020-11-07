require('css/components/loadingIndicator.scss');

var React = require('react'),
	PureRenderMixin = require('react-addons-pure-render-mixin');

/*
 *	Template
 */
function r() {

	var cubeStyle = {
		backgroundColor:this.props.backgroundColor,
	};

	var outerStyle = {
		backgroundColor:this.props.contrastColor,
	};

	return (
		<div style={this.props.style} className="vpp_loading_indicator">
 			<div className="vpp_loading_indicator_cube">
 			 	<div style={outerStyle} className = 'vpp_background'></div>
				  <div  className='vpp_cube'><div style={cubeStyle}></div></div>
				  <div  className='vpp_cube'><div style={cubeStyle}></div></div>
				  <div  className='vpp_cube'><div style={cubeStyle}></div></div>
				  <div  className='vpp_cube'><div style={cubeStyle}></div></div>
			</div>
		</div>
	);
}

var Marker = React.createClass({

	mixins: [PureRenderMixin],

	render: r,

	propTypes: {
		backgroundColor: React.PropTypes.string,
		outlineColor: React.PropTypes.string,
	},
});



/*
 *	Class
 */
module.exports = Marker;



