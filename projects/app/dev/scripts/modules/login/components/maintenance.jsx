var React = require('react'),
	
	// strings
	s = require('strings')('login.maintenance'),
	Marionette = require('marionette'),

	// components
	AppPage = require('components/app_page'),
	Button = require('components/button');



function r() {
	return (
		<AppPage 
			title={ this.props.embedded ? '': s('title')}
			size='small'
			className = 'vp_maintenance'
			>
			<p>
			{s('message')}
			</p>
			<Button
				title = 'Try again'
				onClick= {this.onTryAgain} />
		</AppPage>
		);
}


module.exports = React.createClass({

	render: r,

	onTryAgain: function(values) {
		Marionette.App.route("dashboard");
	}
	
});