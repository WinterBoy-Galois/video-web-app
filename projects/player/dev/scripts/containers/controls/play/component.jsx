require('css/containers/controlsPlay.scss');

var React = require('react'),
	Playbar = require('../components/playbar'),
	PlaybarMobilePortrait = require('../components/playbarMobilePortrait'),
	Markers = require('../components/markersView'),
	MarkersMobilePortrait = require('../components/markersViewMobilePortrait'),
	RightButtons = require('../components/rightButtons'),
	LargeButton = require('../components/largeButton'),
	Button = require('components/controlButton');




var ControlsPlayRegular = function (props) {
	var style = {};
	if (props.allowClickthrough) {
		style = {
			pointerEvents:'none'
		};
	}

	return (
		<div className = 'vp_controls_play' style={style}>
			<Markers 
				{...props} />
			<Playbar 
				{...props}/>
			<LargeButton
				{...props} />
			<RightButtons 
				disabled={props.sidebuttonsDisabled}
				{...props} />
		</div>
	);
};

var ControlsPlayMobilePortrait = function (props) {
	var top = props.playerWidth / props.aspect;

	var buttonStyle = {
		top:0,
		left:0,
		right:0,
		height: top,
		position:'absolute',
		pointerEvents: (props.allowLargeButtonsClickThrough ? 'none' : '')
	};

	var markersStyle = {
		top:top + 16,
		left:0,
		right:0,
		bottom:0,
		position:'absolute'
	};

	var logoStyle = {
		left:5,
		top:5,
		position: 'absolute'
	};


	return (
		<div className = 'vp_controls_play'>
			<div style = {markersStyle} >
				<MarkersMobilePortrait 
					{...props} />
			</div>
			<div style = {buttonStyle}>
				<LargeButton
					{...props} />
			</div>
			<Button 
				style={logoStyle}
				type={props.customIcon ? 'custom': 'videopath'}
				activeBackgroundColor={props.colors.button.backgroundColor}
				iconURL={props.customIcon} />
			<PlaybarMobilePortrait {...props} />
		</div>
	);
};


var ControlsPlay = function(props) {

	if ( props.mobilePortraitUI ) 
		return ControlsPlayMobilePortrait(props);

	return ControlsPlayRegular(props);
};

module.exports = ControlsPlay;


