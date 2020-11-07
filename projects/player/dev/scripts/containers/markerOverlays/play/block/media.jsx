var React = require('react'),
	PureRenderMixin = require('react-addons-pure-render-mixin'),
	LoadingIndicator = require('components/loadingIndicator'),
	Media = require('components/media');

/*
 *	Template
 */
function r() {

	var content = false;
	if ( this.state.displayContent ) {
		content = <Media 
					autoplay = {this.props.autoplay}
					service = {this.props.service}
					serviceIdentifier = {this.props.service_id}/>;
	}

	// in case this overlay is removed, don't render media block
	if ( this.props.removed ) {
		content = false;
	}

	return (
		<div>
			<LoadingIndicator />
			<div className ='vpp_loading_text'>Waiting for {this.props.service}</div>
			{content}
		</div>
	);
}

var MediaBlock = React.createClass({

	mixins: [PureRenderMixin],

	render: r,

	getInitialState: function() {
		return {
			displayContent: false
		};
	},

	// artificially delay loading here for better player animation performance
	componentDidMount: function() {
		var _this = this;
		this.startupTimer = setTimeout(function(){
			_this.setState({
				displayContent: true
			});
		},1000);	
	},

	componentWillUnmount: function() {
		clearTimeout(this.startupTimer);
	},

	propTypes: {
		service:React.PropTypes.string.isRequired,
		service_id:React.PropTypes.string.isRequired,
		autoplay: React.PropTypes.bool
	},

});

/*
 *	Class
 */
module.exports = MediaBlock;



