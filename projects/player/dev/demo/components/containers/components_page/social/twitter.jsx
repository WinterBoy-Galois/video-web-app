var _ = require('underscore'),
	React = require('react'),
	Section = require('../_section'),
	SocialFeed = require('components/socialFeed');

/*
 *	Template
 */
function r() {
	return (
		<Section title='Twitter'>
			<SocialFeed service='twitter' serviceIdentifier='@videopath' />
		</Section>
	);
}

/*
 *	Class
 */
module.exports = React.createClass({
	render: r,
});


