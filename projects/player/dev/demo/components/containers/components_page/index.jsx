var _ = require('underscore'),
	ReactRedux = require('react-redux'),
	Page = require('./page'),
	actions = require('../../actions');


var mapState = function(state, ownProps){
	return {
		path: state.app.path,
	};
};

var mapDispatch = function(dispatch, ownProps) {
	return {
		onComponentChanged: function(container) {
			dispatch(actions.changePath(['components', container]));
		},
	};
};

module.exports = ReactRedux.connect(mapState, mapDispatch)(Page);