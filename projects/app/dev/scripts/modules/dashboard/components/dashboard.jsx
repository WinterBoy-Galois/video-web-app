var React = require('react'),
	
	// strings
	s = require('strings')('login.maintenance'),

	// components
	AppPage = require('components/app_page');



function r() {

	var content = false;

	content = [<div>Thomas gorny</div>, <div>blah</div>];


	return (
		<AppPage 
			title='Dashboard'
			size='small'
			className = 'vp_dashboard'>
			{content}
		</AppPage>
		);
}


module.exports = React.createClass({

	render: r,
	
});
