var React = require('react'),
	CTAButton = require('components/ctaButton');

/*
 *	Template
 */
function BrandedEndscreenView(props) {

	return (
	<div className='vpp_endscreen_content_inner'>
		<h3>This interactive video was created with Videopath.</h3>
		<CTAButton 
			onClick={props.onCTAButtonClicked}
			textColor='white'
			color='#ff884d'
			title='Try Videopath Now'/>
	</div>);
}


/*
 *	Class
 */
module.exports = BrandedEndscreenView;



