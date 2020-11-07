var _ = require('underscore'),
	React = require('react'),
	Section = require('../_section'),
	SocialFeed = require('components/socialFeed');

/*
 *	Template
 */
function r() {
	return (
		<Section title='Pinterest Board'>
			<SocialFeed service='pinterest-board' serviceIdentifier='artnau/backpack' />
		</Section>
	);
}

/*
 *	Class
 */
module.exports = React.createClass({
	render: r,
});


