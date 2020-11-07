var React = require('react'),
	PureRenderMixin = require('react-addons-pure-render-mixin'),


	LoadingIndicator = require('components/loadingIndicator');

/*
 *	Template
 */
function r() {

	var className = this.state.loaded ? 'vpp_loaded': 'vpp_loading',
		style = {};

	if ( this.props.image_align) {
		style={
			textAlign: this.props.image_align
		};
	}

	return (
		<div className={className} style={style}> 
			<LoadingIndicator />
			<img src={this.props.image_url} onLoad={this.onLoad}/>
		</div>
	);
}

var ImageBlock = React.createClass({

	mixins: [PureRenderMixin],

	render: r,

	getInitialState: function() {
		return {
			loaded:false
		};
	},

	onLoad: function() {
		this.setState({
			loaded:true
		});
	},

	propTypes: {
		image_url:React.PropTypes.string.isRequired,
	},

});

/*
 *	Class
 */
module.exports = ImageBlock;



