var _ = require('underscore'),
	React = require('react');

var sections = [
	require('./typography'),
	require('./buttons'),
	require('./forms'),
	require('./icons'),
	require('./modals'),
	require('./tables'),
	require('./misc'),
	require('./dashboard')
];

/*
 *	Template
 */
function r() {
	return (
		<div className = 'vp_demo_page'>
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
