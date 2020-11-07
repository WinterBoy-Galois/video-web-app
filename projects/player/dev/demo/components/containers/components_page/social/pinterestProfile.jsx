var _ = require('underscore'),
	React = require('react'),
	Section = require('../_section'),
	SocialFeed = require('components/socialFeed');

/*
 *	Template
 */
function r() {
	return (
		<Section title='Pinterest Profile'>
			<SocialFeed service='pinterest-profile' serviceIdentifier='artnau' />
		</Section>
	);
}

/*
 *	Class
 */
module.exports = React.createClass({
	render: r,
});


