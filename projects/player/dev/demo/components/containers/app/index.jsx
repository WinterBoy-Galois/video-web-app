var ReactRedux = require('react-redux'),
	App = require('./app'),

	actions = require('../../actions');


var mapState = function(state, ownProps){
	return {
		path: state.app.path
	};
};

var mapDispatch = function(dispatch, ownProps) {
	return {
		onPageChange: function(path, queryVars) {
			dispatch(actions.changePath(path,queryVars));
		},
		onStateUpdate: function(state) {
			dispatch(actions.syncState(state));
		}
	};
};

module.exports = ReactRedux.connect(mapState, mapDispatch)(App);