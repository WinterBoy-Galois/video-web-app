var _ = require('underscore'),
	React = require('react'),
	Section = require('../_section'),
	SocialFeed = require('components/socialFeed');

/*
 *	Template
 */
function r() {
	return (
		<div>
			<Section title='Facebook Page'>
				<SocialFeed service='facebook-page' serviceIdentifier='https://www.facebook.com/videopath' />
			</Section>
			<Section title='Twitter Stream'>
				<SocialFeed service='twitter' serviceIdentifier='@videopath' />
			</Section>
			<Section title='Pinterest Board'>
				<SocialFeed service='pinterest-board' serviceIdentifier='artnau/backpack' />
			</Section>
			<Section title='Pinterest Profile'>
				<SocialFeed service='pinterest-profile' serviceIdentifier='artnau' />
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


