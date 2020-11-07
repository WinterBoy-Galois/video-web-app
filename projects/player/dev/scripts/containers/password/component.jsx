require('css/containers/password.scss');

var React = require('react'),
	PureRenderMixin = require('react-addons-pure-render-mixin'),
	Logo = require('components/logo');

/*
 *	Template
 */
function r() {

	var text = "This video is password protected.";
	if (this.props.showError) {
		text = "Incorrect password. Please try again.";
	}
	if ( this.props.disabled ) {
		text = "Too many tries. Please try again later.";
	}

	return (
		<div className = 'vpp_password'>
			<div className = 'vpp_inner'>
				<div>{text}</div>
				<input disabled = {this.props.disabled} ref='input' type='password' placeholder='Enter Password' onKeyUp={this.onKeyUp}/>
				<div className='vpp_button' onClick={this.onSubmit}>Submit</div>
			</div>
			<Logo />
		</div>);
}

var Password = React.createClass({

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
module.exports = Password;



