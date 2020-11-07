var React = require('react');

var LoadingIndicator = function(props) {

	if (!props.visible) {
		return <div></div>;
	}

	var className = 'vp_loading_indicator_new ' + (props.expanded ? 'vp_expanded': '');

	return (
		<div className = {className} >
			<div className = 'vp_loading_indicator_coq'>
			</div>
		</div>
	);
};

LoadingIndicator.propTypes = {
	expanded: React.PropTypes.bool,
	visible: React.PropTypes.bool
};

LoadingIndicator.defaultProps = {
	visible:true,
	expanded:true
};

module.exports = LoadingIndicator;