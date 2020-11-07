var components = require('components'),
	React = require('react');


var Icon = function(props) {

	var className = 'vp_icon' +
					' vp_icon_' + props.type + 
					' vp_' + props.color + 
					(props.onClick? ' vp_clickable' : '');

	return <span className = {className} onClick = {props.onClick}></span>;
};


Icon.propTypes = {
	color: React.PropTypes.oneOf(components.constants.colors),
	type: React.PropTypes.oneOf(components.constants.icons),
	onClick: React.PropTypes.func
};

Icon.defaultProps = {
	color:false
};

module.exports = Icon;