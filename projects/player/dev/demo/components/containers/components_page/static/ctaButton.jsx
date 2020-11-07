var React = require('react'),
	Section = require('../_section'),
	CTAButton = require('components/ctaButton');

/*
 *	Template
 */
function r() {
	return (
		<Section title='CTA Button' className = 'vp_cta_button'>
			<CTAButton title='Test Button' color='green'/>
			<CTAButton title='Test Button' color='blue'/>
			<CTAButton title='Test Button' color='orange'/>
			<CTAButton title='Test Button' color='#555'/>
			<CTAButton title='Test Button' color='darkblue'/>
			<CTAButton title='Test Button' color='#ddd'/>
		</Section>
	);
}

/*
 *	Class
 */
module.exports = React.createClass({
	render: r,
});



