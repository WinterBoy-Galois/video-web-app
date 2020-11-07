var React = require('react'),
	Section = require('../_section'),
	Logo = require('components/logo'),
	ClickHint = require('components/clickHint');

/*
 *	Template
 */
function r() {
	return (
		<Section title='Misc' className = 'vp_misc'>
			<h3>Click Hint</h3>
			<ClickHint color='green'/>
			<ClickHint color='blue'/>
			<ClickHint color='red'/>
			<ClickHint color='white'/>
			<h3>Logo</h3>
			<Logo />
		</Section>
	);
}

/*
 *	Class
 */
module.exports = React.createClass({
	render: r,
});



