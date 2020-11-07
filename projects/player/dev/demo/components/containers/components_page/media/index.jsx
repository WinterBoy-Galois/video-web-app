var _ = require('underscore'),
	React = require('react'),
	Media = require('components/media'),
	Section = require('../_section');


/*
 *	Template
 */
function r() {
	return (
		<div>
			<Section title='YouTube' className = 'vp_media'>
				<Media 
					service='youtube'
					serviceIdentifier='N67qLbCUhq4'/>
			</Section>

			<Section title='Vimeo' className = 'vp_media'>
				<Media 
					service='vimeo'
					serviceIdentifier='12682532'/>
			</Section>

			<Section title='Soundcloud' className = 'vp_media'>
				<Media 
					service='soundcloud'
					serviceIdentifier='massappealrecs/close-your-eyes-and-count-to-fuck-feat-zack-de-la-rocha'/>
			</Section>

			<Section title='Videopath' className = 'vp_media'>
				<Media 
					service='videopath'
					serviceIdentifier='wmq2XEQj'/>
			</Section>

			<Section title='Pinterest Pin' className = 'vp_media'>
				<Media 
					service='pinterest'
					serviceIdentifier='544443042430775545'/>
			</Section>

			<Section title='Instagram Image' className = 'vp_media'>
				<Media 
					service='instagram'
					serviceIdentifier='r823m4D2z9'/>
			</Section>


		</div>
	);
}

/*
 *	Class
 */
module.exports = React.createClass({
	render: r,
});


