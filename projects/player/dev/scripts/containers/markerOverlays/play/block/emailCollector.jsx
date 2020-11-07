var React = require('react'),
	PureRenderMixin = require('react-addons-pure-render-mixin'),
	CTAButton = require('components/ctaButton');

// util
function validateEmail(email) {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
}


/*
 *	Template
 */
function r() {

	var message;

	if ( this.state.message ) {
		message = <div className = 'vpp_message'>{this.state.message}</div>;
	}

	return (
		<div> 
			{this.props.text}
			<div className = 'vpp_input_wrapper'>
				<input ref='input' placeholder='Your email address'/>
				<CTAButton title='Submit' onClick={this.onSubmit}/>
				{message}
			</div>
		</div>
	);
}

var ImageBlock = React.createClass({

	mixins: [PureRenderMixin],

	render: r,

	onSubmit: function() {

		var email = this.refs.input.value;

		if (!validateEmail(email)) {
			this.setState({
				message: 'Please enter a valid e-mail address.'
			});
			setTimeout(this.clearMessage,1000);
			return;
		}

		this.setState({
			message:'Thanks for submitting!'
		});

		this.props.onSubscribeEMailButtonClick(email, this.props.service, this.props.service_id);
	},

	getInitialState: function() {
		return {};
	},

	clearMessage: function() {
		this.setState({
			message:false
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



