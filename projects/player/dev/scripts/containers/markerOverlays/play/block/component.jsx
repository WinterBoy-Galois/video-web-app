var React = require('react'),
	PureRenderMixin = require('react-addons-pure-render-mixin'),

	Blocks = {
		text: require('./text'),
		media: require('./media'),
		audio: require('./media'),
		video: require('./media'),
		image: require('./image'),
		simple_button: require('./simpleButton'),
		website: require('./website'),
		social: require('./social'),
		email_collector: require('./emailCollector'),
	};

/*
 *	Template
 */
function r() {

	var Component = Blocks[this.props.type],
		className = 'vpp_content_block vpp_' + this.props.type;

	className += this.props.applyIOSFixes ? ' vpp_ios_fix' : '';

	return (
		<div className = {className}>
			<Component 
				{...this.props}/>
		</div>
	);
}

var ContentBlock = React.createClass({

	mixins: [PureRenderMixin],

	render: r,

	propTypes: {
		type:React.PropTypes.string
	},

});

/*
 *	Class
 */
module.exports = ContentBlock;



