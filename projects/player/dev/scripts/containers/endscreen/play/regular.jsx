var React = require('react'),
	CTAButton = require('components/ctaButton'),
	Logo = require('components/logo'),
	ControlButton = require('components/controlButton');

/*
 *	Template
 */
function BrandedEndscreenView(props) {
	
	var title = false,
		subtitle = false,
		button = false;

	if ( props.title ) {
		title = <h3>{props.title}</h3>;
	}	
	subtitle = props.subtitle;

	if ( props.buttonTitle ) {
		button = <CTAButton 
				onClick={props.onCTAButtonClicked}
				color={props.buttonColor}
				title={props.buttonTitle}/>;
	}


	return (
	<div className='vpp_endscreen_content_inner'>
		{title}
		{subtitle}
		<br />
		{button}
		<br />
	</div>);
}


/*
 *	Class
 */
module.exports = BrandedEndscreenView;



