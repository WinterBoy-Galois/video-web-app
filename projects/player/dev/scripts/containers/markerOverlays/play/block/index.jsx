var _ = require('underscore'),
	ReactRedux = require('react-redux'),
	Component = require('./component'),
	actions = require('actions');


var mapState = function(state, ownProps){
	var data = JSON.parse(ownProps.data) || {};
	return _.extend(data, {
		type: ownProps.type,
		applyIOSFixes: state.environment && (state.environment.isIPhone || state.environment.isIPad),
		secure:  state.environment && state.environment.loadedSecurely
	});
};

var mapDispatch = function(dispatch, ownProps) {
	return {
		onCTAButtonClick: function() {
			var data = JSON.parse(ownProps.data);
			dispatch(actions.ctaClick(data.target_url));
		},
		onSubscribeEMailButtonClick: function(email, service, serviceID) {
			dispatch(actions.subscribeEmail(email, service, serviceID));
		}
	};
};

module.exports = ReactRedux.connect(mapState, mapDispatch)(Component);

// export for debugging purposes
module.exports._mapState = mapState;
module.exports._mapDispatch = mapDispatch;
module.exports._component = Component;
