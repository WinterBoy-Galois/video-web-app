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
		<div className = 'vp_custom_hosting_form'>
			<Forms.Form 
				onSubmit={onSubmit.bind(this)}
				submitButtonTitle='Import'>
				<Forms.Input 
					name='mp4'
					label='Url to mp4 file'
					placeholder = 'http://mycdn.com/video.mp4'
				/>
				<Forms.Input 
					name='webm'
					label='Url to webm file'
					placeholder = 'http://mycdn.com/video.webm'
				/>
				<Forms.Input 
					name='width'
					label='Width in pixels'
					placeholder = '768'
				/>
				<Forms.Input 
					name='height'
					label='Height in pixels'
					placeholder = '576'
				/>
				<Forms.Input 
					name='duration'
					label='Duration in seconds'
					placeholder = '300'
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