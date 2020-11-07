var _ = require('underscore'),
	React = require('react'),

	Forms = require('components/forms');

function onSubmit(vals) {
	this.props.onURLSubmitted(vals);
};

/*
 *	Template
 */
function r() {

	return (
		<div className = 'vp_service'>
			<Forms.Form 
				onSubmit={onSubmit.bind(this)}
				submitButtonTitle='Import'>
				<Forms.Input 
					name='url'
					label={this.props.config.label}
					placeholder = {this.props.config.example_url}
				/>
			</Forms.Form>
		</div>
	);
}

module.exports = React.createClass({
	render: r,
	propTypes: {
	    config: React.PropTypes.object.isRequired,
	    onURLSubmitted:React.PropTypes.func.isRequired
	},
});