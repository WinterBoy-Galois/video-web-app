var components = require('components'),
	React = require('react'),

	Icon = require('components/icon');


var Button = function(props) {

	var className = 
		'vp_button ' + 
		'vp_' + props.color + ' ' +
		(props.className || '') + ' ' +
		(props.style == 'outlined' ? 'vp_outlined': '')+ ' ' +
		(props.disabled ? 'vp_disabled' :'') + ' ' +
		(props.title ? '' : 'vp_icon_button' );

	var onClick = false;
	if (!props.disabled) {
		onClick = function(){
			props.onClick();
		};
	}

	var icon = false;
	if ( props.icon ) {
		icon = <Icon type={props.icon} />;
	}

	return  (
		<div className = {className} onClick={onClick}>
			{icon}
			{props.title}
		</div>
	);
};


Button.propTypes = {
	color: React.PropTypes.oneOf(components.constants.colors),
    icon: React.PropTypes.oneOf(components.constants.icons),
    className: React.PropTypes.string,
    title: React.PropTypes.string,
    style: React.PropTypes.oneOf(['regular', 'outlined']),
    disabled: React.PropTypes.bool
};

Button.defaultProps = {
	color:'green',
	icon: false,
	style: 'regular',
	disabled:false
};

module.exports = Button;
