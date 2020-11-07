require('css/components/controlButtonPlay.scss');

var React = require('react'),
	PureRenderMixin = require('react-addons-pure-render-mixin'),
	ControlButton = require('./controlButton');

/*
 *	Template
 */
function r() {
	var className = 'vpp_control_button_play vpp_' + this.props.size;
	return (
		<ControlButton type='play' {...this.props} className={className}/> 
	);
}

var ControlButtonPlay = React.createClass({

	mixins: [PureRenderMixin],

	render: r,

	propTypes: {
		backgroundColor: React.PropTypes.string,
		textColor: React.PropTypes.string,

		activeBackgroundColor: React.PropTypes.string,
		activeTextColor: React.PropTypes.string,

		size: React.PropTypes.string,
	},

});



/*
 *	Class
 */
module.exports = ControlButtonPlay;


