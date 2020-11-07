var _ = require('underscore'),
	React = require('react'),
	Button = require('../button'),

	LoadingIndicator = require('../loadingIndicator');


/*
 *	Template
 */
function r() {

	var _this = this;

	/*
 	 * Create Submit Button
	 */
	var button = '';
	if (this.props.submitButtonTitle) {
		button = (
			<div className = 'vp_form_row'>
				<Button title = {this.props.submitButtonTitle} onClick = {this.onSubmit}></Button>
			</div>
		);
	}

	/*
	 * Add references based on element name and wire enter callback to forms submitcallback
	 * Set errors
	 */
	var addRefsAndCallbacks = function(element) {
		var name = element.props.name,
			error = (_this.state.errors && _this.state.errors[name]) ? _this.state.errors[name] : '';

		// if error comes as array, join the error messages
		if (error.join) error = error.join(' ');

		var clone = React.cloneElement(element, {
			'ref': element.props.name, 
			'onEnter': _this.onSubmit,
			'error': error
		});
		clone = <div className = 'vp_form_row'>{clone}</div>;
		return clone;
	};

	/*
	 * Render the form
	 */
	return (
		<div className = 'vp_form'>
			{React.Children.map(this.props.children, addRefsAndCallbacks)}
			{button}
			<LoadingIndicator visible={this.state.loading}/>
		</div>
	);
}

module.exports = React.createClass({

	render: r,

	onSubmit: function(){
		if (this.props.onSubmit) {
			this.props.onSubmit(this.getValues());
		}
	},

	getInitialState: function(){
		return {
			loading:false,
			errors: false
		};
	},

	/*
	 *	Get all values of children
	 */
	getValues: function(){
		var result = {};
		for ( var ref in this.refs) {
			result[ref] = this.refs[ref].value();
		}
		return result;
	},

	/*
	 * Props
	 */
	propTypes: {
	    onSubmit: React.PropTypes.func,
	    submitButtonTitle: React.PropTypes.string,
	    loading: React.PropTypes.bool
	}
});





