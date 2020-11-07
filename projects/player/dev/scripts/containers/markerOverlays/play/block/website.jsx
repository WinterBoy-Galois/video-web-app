var React = require('react'),
	PureRenderMixin = require('react-addons-pure-render-mixin'),
	LoadingIndicator = require('components/loadingIndicator'),
	Fader = require('components/fader');

// helper
function getLocation(href) {
    var match = href.match(/^(https?\:)\/\/(([^:\/?#]*)(?:\:([0-9]+))?)(\/[^?#]*)(\?[^#]*|)(#.*|)$/);
    return match && {
        protocol: match[1],
        host: match[2],
        hostname: match[3],
        port: match[4],
        pathname: match[5],
        search: match[6],
        hash: match[7]
    };
}

/*
 *	Template
 */
function r() {

	// in a secure environment (https://), make sure the url is always
	// pointing to https, even if entered as http
	var url = this.props.url;
	if ( this.props.secure ) {
		url = url.replace('http://', 'https://');
	}

	var content = false;
	if ( this.state.displayContent ) {
		content = <iframe width='100%' height='100%' frameBorder='0' src={url} onLoad={this.onIFrameLoad}/>;
	}

	var hostname = getLocation(this.props.url);
	hostname = hostname && hostname.hostname;

	return (
		<div>
			<Fader showing={!this.state.loadedContent}>
				<LoadingIndicator />
				<div className ='vpp_loading_text'>Waiting for {hostname}</div>
			</Fader>
			{content}
		</div>
	);
}

var WebsiteBlock = React.createClass({

	mixins: [PureRenderMixin],

	render: r,

	propTypes: {
		url:React.PropTypes.string.isRequired,
	},

	getInitialState: function() {
		return {
			displayContent: false,
			loadedContent: false
		};
	},

	componentDidMount: function() {
		var _this = this;
		this.startupTimer = setTimeout(function(){
			_this.setState({
				displayContent: true
			});
		},500);	
	},

	componentWillUnmount: function() {
		clearTimeout(this.startupTimer);
	},

	onIFrameLoad: function() {
		this.setState({
			loadedContent:true
		});
	}

});

/*
 *	Class
 */
module.exports = WebsiteBlock;



