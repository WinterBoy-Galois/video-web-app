var React = require('react'),
	PureRenderMixin = require('react-addons-pure-render-mixin'),
	LoadingIndicator = require('components/loadingIndicator'),
	SocialFeed = require('components/socialFeed');


var names = {
	'facebook-page':'Facebook',
	'twitter': 'Twitter',
	'pinterest-profile': 'Pinterest',
	'pinterest-board': 'Pinterest'
};

/*
 *	Template
 */
function r() {

	return (
		<div>
			<div className ='vpp_loading_text'>Waiting for {names[this.props.service]}</div>
			<LoadingIndicator />
			<SocialFeed 
				service={this.props.service} 
				serviceIdentifier={this.props.service_id} />
		</div>
	);
}

var SocialBlock = React.createClass({

	mixins: [PureRenderMixin],

	render: r,

	propTypes: {
	},

});

/*
 *	Class
 */
module.exports = SocialBlock;



