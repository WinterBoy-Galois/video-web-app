var _ = require('underscore'),
	ReactRedux = require('react-redux'),
	Page = require('./page'),
	actions = require('../../actions');


var mapState = function(state, ownProps){
	return {
		path: state.app.path,
		playerState: state.containers.playerState,
		environment:state.containers.environment,
		containerPropertys: state.app.urlVars
	};
};

var mapDispatch = function(dispatch, ownProps) {
	return {
		onContainerChanged: function(container) {
			dispatch(actions.changePath(['containers', container]));
		},
		onContainerPropertyChanged: function(container, property,value) {
			dispatch(actions.changeContainerProp(property,value));
		},
		onEnvironmentPropChanged: function(key, value) {
			dispatch(actions.changeEnvironmentProp(key, value));
		},
		onPlayerStatePropChanged: function(key, value) {
			dispatch(actions.changePlayerStateProp(key, value));
		}
	};
};

module.exports = ReactRedux.connect(mapState, mapDispatch)(Page);