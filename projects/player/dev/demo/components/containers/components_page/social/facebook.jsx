var _ = require('underscore'),
	React = require('react'),
	Section = require('../_section'),
	SocialFeed = require('components/socialFeed');

/*
 *	Template
 */
function r() {
	return (
		<Section title='Facebook'>
			<SocialFeed service='facebook-page' serviceIdentifier='https://www.facebook.com/videopath' />
		</Section>
	);
}

/*
 *	Class
 */
module.exports = React.createClass({
	render: r,
});


