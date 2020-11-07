var _ = require('underscore'),

	React = require('react'),
	Section = require('./_section'),

	constants = require('components').constants,
	Icon = require('components/icon');




/*
 *	Template
 */
function r() {
	return (
		<Section title='Icons' className = 'vp_icons'>
			<h3>Colors</h3>
			{ _.map(constants.colors, function(color){
					return <Icon key = {color} color = {color} type='diamond'/>;
			}) }
			<h3>Shapes</h3>
			{ _.map(constants.icons, function(icon){
					return <span key = {icon}><Icon type={icon}/> {icon} | </span>;
			}) }
		</Section>
	);
}

/*
 *	Class
 */
module.exports = React.createClass({
	render: r,
});



