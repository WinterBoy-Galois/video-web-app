var _ = require('underscore'),
	React = require('react'),
	sizeSelector = require('util/sizeSelector'),
	uiConfig = require('config/ui'),
	Button = require('components/controlButtonPlay'),
	LoadingIndicator = require('components/loadingIndicator'),
	Fader = require('components/fader');


var LargeButtons = function(props) {
	
	var buttonSize = sizeSelector(uiConfig.playButtonSizeSelector, props.playerWidth, props.playerHeight).name;

	var style = {};
	if (props.allowLargeButtonsClickThrough) {
		style = {
			pointerEvents:'none'
		};
	}

	return (
		<div style={style} className = 'vp_large_buttons' onClick={props.onTogglePlayClick}>
			<Fader showing={props.showLargeLoadingIndicator}>
				<LoadingIndicator 
					{...props.colors.loadingIndicator}/>
			</Fader>
			<Fader showing={props.showLargePlayButton}>
				<Button 
					size={buttonSize}
					{...props.colors.button}/>
			</Fader>
		</div>
	);
};

LargeButtons.propTypes = {
	state:React.PropTypes.string,
	colors:React.PropTypes.object.isRequired,
	onTogglePlayClick: React.PropTypes.func.isRequired
};

/*
 *	Class
 */
module.exports = LargeButtons;
