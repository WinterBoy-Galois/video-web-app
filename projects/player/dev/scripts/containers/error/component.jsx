require('css/containers/error.scss');

var React = require('react'),
	PureRenderMixin = require('react-addons-pure-render-mixin'),
	Logo = require('components/logo');

/*
 *	Template
 */
function r() {

	var message = this.props.message || 'There was an error playing back this video.';

	return (
		<div className = 'vpp_error'>
			<div className = 'vpp_inner'>
				{message}
			</div>
			<Logo />
		</div>);
}

var ErrorView = React.createClass({

	mixins: [PureRenderMixin],

	render: r,

	onKeyUp: function(e) {
		if (e.keyCode == 13) {
			this.onSubmit();
		};
	},

	onSubmit: function() {
		if (this.props.disabled) return;
		this.props.onSubmitPassword(this.refs.input.value);
	},

});

/*
 *	Class
 */
module.exports = ErrorView;



