var _ = require('underscore'),
	React = require('react'),
	sdk = require('sdk'),

	ControllerWrapper = require('components/controllerWrapper'),

	NavBar = require('./navbar'),

	Modals = require('./modals');

function r(){

	return (
		<div>
			<NavBar 
				user = {sdk.currentUser}
                teams = {sdk.teams} />

			<div id="vp_app_content">
				{this.state.content}
			</div>

			<div id = "footer">
				<a href = "http://videopath.com">Copyright © 2020 Intelling Media Corp.</a> &#9830;
				<a href = "http://videopath.com/imprint">Imprint</a> &#9830;
				<a href = "mailto:support@videopath.com">Support</a>
			</div>

			<ControllerWrapper ref = 'modals_old' id = "modals" />

			<Modals ref = "modals" />
		</div>
	);

};

var App = React.createClass({
	render:r,
	getInitialState: function() {
	    return {
	    	content:false,
	    };
  },
});

module.exports = App;








