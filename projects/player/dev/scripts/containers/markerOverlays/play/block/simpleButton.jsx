var React = require('react'),
	PureRenderMixin = require('react-addons-pure-render-mixin'),
	CTAButton = require('components/ctaButton');

/*
 *	Template
 */
function r() {

	return (
		<CTAButton 
			onClick={this.props.onCTAButtonClick}
			title={this.props.title} 
			color={this.props.color}/>
	);
}

var SimpleButtonBlock = React.createClass({

	mixins: [PureRenderMixin],

	render: r,

	propTypes: {
		onCTAButtonClick: React.PropTypes.func.isRequired,
		url: React.PropTypes.string.isRequired,
		title: React.PropTypes.string.isRequired,
		color: React.PropTypes.string.isRequired
	},

});


/*
 *	Class
 */
module.exports =  SimpleButtonBlock;



