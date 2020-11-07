var // _ = require('underscore'),

	React = require('react'),
	Section = require('./_section'),

	// constants = require('components').constants,
	VideoComponent = require('modules/dashboard/components/video'),
	videoData = require('../fixtures').videos.some;


/*
 *	Template
 */
function r() {
	return (
		<Section title='Dashboard' className="dashboard">
			{videoData.map((video) => <VideoComponent video={video.attributes}/> )}
		</Section>
	);
}

/*
 *	Class
 */
module.exports = React.createClass({
	render: r,
});
