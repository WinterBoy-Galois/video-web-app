/*
 * Define how player state and environment objects look like
 */


// state of playback
var playerState = {

	state: 'initializing',

	progress: 0,
	buffer: 0,
	hasPlayed: false,
	volume:0,


	controlsHidden:false


};


// state of environment
var environment = {

	// size of the surrounding player
	playerWidth:0,
	playerHeight:0,

	// settings
	autoplay: false,
	openMarkerOnStart: false,

	// platform & hardware
	isIPhone: false,
	iIPad: false,
	isAndroid: false,
	isTouch: false,

	// available features
	supportsFullscreen: false,
	supportsVolumeChanges: false,
	supportsNativeSharing: false

};