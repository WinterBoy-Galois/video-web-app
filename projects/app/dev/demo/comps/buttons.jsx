var _ = require('underscore'),

	React = require('react'),
	Section = require('./_section'),

	constants = require('components').constants,
	Button = require('components/button');



function onButtonClick() {
	console.log('Click');
}

/*
 *	Template
 */
function r() {
	return (
		<Section title='Buttons' className = 'vp_buttons'>
			<h3>Colors</h3>
			<div>
				{ _.map(constants.colors, function(color){
					return <Button key = {color} title={'Color ' + color} color={color} onClick={onButtonClick}/>;
				}) }
			</div>

			<h3>Icons</h3>
			<div>
				{ _.map(constants.icons, function(icon){
					return <Button key={icon} title={'Icon ' + icon} color='blue' icon = {icon} onClick={onButtonClick}/>;
				}) }
			</div>

			<h3>Style & Outline</h3>
			<div>
				<Button title='Regular' icon='diamond' />
				<Button title='Outlined' icon='diamond' style='outlined'/>
				<Button title='Disabled' icon='diamond' disabled/>
				<Button title='Disabled & Outlined' icon='diamond' style='outlined' disabled/>
			</div>

		</Section>
	);
}

/*
 *	Class
 */
module.exports = React.createClass({
	render: r,
});



