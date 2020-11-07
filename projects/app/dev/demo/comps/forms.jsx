var React = require('react'),
	Section = require('./_section'),

	Forms = require('components/forms');



function onSubmit(vals) {
	console.log(vals);
}

/*
 *	Template
 */
function r() {
	return (
		<Section title='Forms'>
			<Forms.Form
				submitButtonTitle = 'Submit'
				onSubmit = {onSubmit}
				ref = 'form'
				>
				<Forms.Input 
					label='Email'
					name='email'
				/>
				<Forms.Input 
					label='Password'
					type='password'
					name='password'
				/>
				<Forms.Input 
					label='Terms and Services'
					type='checkbox'
					name='tos'
				/>
			</Forms.Form>
		</Section>
	);
}

/*
 *	Class
 */
module.exports = React.createClass({
	render: r,
});



