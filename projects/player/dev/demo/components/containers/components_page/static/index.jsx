var _ = require('underscore'),
	React = require('react');

var sections = [
	require('./controls'),
	require('./ctaButton'),
	require('./misc'),
];

/*
 *	Template
 */
function r() {
	return (
		<div>
			{_.map(sections, function(Section, index) {return <Section key = {index} />;}) }
		</div>
	);
}

/*
 *	Class
 */
module.exports = React.createClass({
	render: r,
});


