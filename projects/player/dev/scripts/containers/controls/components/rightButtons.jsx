var _ = require('underscore'),
	React = require('react'),
	Button = require('components/controlButton'),
	ShareButtons =require('components/shareButtons');


var RightButtons = function(props) {

	var right = props.collapsed ? 50 : -10,
		style = {
			transform:'translate('+right+'px)',
			WebkitTransform: 'translate('+right+'px)',
		},
		buttons = [],
		offset = 10,
		type;

	if ( props.fullscreenEnabled ) {
		type = props.playerInFullscreen ? 'fullscreenExit': 'fullscreen';
		buttons.push(
			<Button 
				key='fullscreen'
				onClick={props.onFullscreenToggleClick}
				style={_.extend({top:offset}, style)}
				{...props.colors.button}
				type={type} />
		);
		offset += 50;
	}

	if ( props.volumeEnabled ) {
		type = props.playerMuted ? 'mute': 'volume';
		buttons.push(
			<Button 
				key='volume'
				onClick={props.onVolumeToggleClick}
				style={_.extend({top:offset}, style)}
				{...props.colors.button}
				type={type} />
		);
		offset += 50;
	}

	if ( props.sharingEnabeld ) {
		buttons.push(
			<ShareButtons 
				key='share'
				onServiceSelected={props.onShareServiceSelected}
				style={_.extend({top:offset}, style)}
				{...props.colors.button}
				type='share' />
		);
	}

	style = {};
	if (props.disabled) {
		style = {
			pointerEvent:'none',
			opacity:0.5
		};
	}

	return (
		<div style={style} className = 'vp_right_buttons'>
			{buttons}
		</div>
	);

};

RightButtons.propTypes = {
	disabled: React.PropTypes.bool,
	collapsed: React.PropTypes.bool,
	colors:React.PropTypes.object.isRequired
};

module.exports = RightButtons;

