require('css/base.scss');
require('css/mainContainers/player.scss');

var React = require('react'),
	ReactRedux = require('react-redux'),

	environment = require('util/environment'),

	FastClick = require('react-fastclick-alt'),

	store = require('./store'),
	actions = require('actions'),

	PlayerContainer = require('./container');



/*
 *	Template
 */
function r() {

	var result = (
		<ReactRedux.Provider store={this.store}>
				<PlayerContainer ref='player' onTouchMove={this.onTouchMove}/>
		</ReactRedux.Provider>
	);

	return result;
}

var App = React.createClass({
	render: r,

	onTouchMove: function(e) {
		e.preventDefault();
	},

	componentWillMount: function() {

		// warn user if player is compiled and deployed in dev mode
		if ("production" !== process.env.NODE_ENV) {
			console.warn('VIDEOPATH PLAYER RUNNING IN DEVELOPMENT MODE');
		}

		// create store and insert video revision
		this.store = store.create();
		this.setRevision(this.props.videoRevision);

		var env = environment.detect();

	    // special css classes for iPhone and Ipad layout
	    if (env.isIPhone || env.isIPad && document ) {
	        document.documentElement.className += ' vpp_ios';
	    }
	},

	componentWillUnmount: function() {
		this.store.dispatch(actions.destroy());
		this.store = false;
	},

	componentWillReceiveProps: function(nextProps) {
		if (nextProps.videoRevision) {
			this.setRevision(nextProps.videoRevision);
		}
	},
	
	setRevision: function(revision) {
		this.store.dispatch(actions.reset());
		this.store.dispatch(actions.updateEnvironment(environment.detect()));
		this.store.dispatch(actions.updateVideoRevision(revision));
	},

	propTypes: {
		videoRevision:React.PropTypes.object
	},

});

/*
 *	Class
 */
module.exports = App;

