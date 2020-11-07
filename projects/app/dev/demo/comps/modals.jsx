var React = require('react'),

	Section = require('./_section'),

	Modal = require('components/modal');


function onModalDone(vals) {
	console.log('Done');
	console.log(vals);
}

function onModalFail() {
	console.log('Reject');
}


/*
 *	Template
 */
function r() {
	return (
		<Section title='Modals' className = 'vp_modals'>
			<h3> Simple Modal</h3>
			<Modal 
				theme='red' 
				title='Red Modal'
				text='Please decide something right now!'
				confirmButton = 'Ok'
				onDone = {onModalDone}
				onFail = {onModalFail}
				rejectButton = 'No way!'
					/>

			<h3>Modal with Form</h3>
			<Modal 
				theme='blue' 
				title='Blue Modal'
				text='Please enter some info for me!'
				confirmButton = 'Ok'
				rejectButton = 'No way!'
				onDone = {onModalDone}
				onFail = {onModalFail}
				icon = 'diamond'
				inputs = {[{
						type:'password',
						placeholder:'Password',
						name:'password'
					},
					{
						type:'text',
						placeholder:'Username',
						name:'username'
					}]}
					/>
		</Section>
	);
}

/*
 *	Class
 */
module.exports = React.createClass({
	render: r,
});



