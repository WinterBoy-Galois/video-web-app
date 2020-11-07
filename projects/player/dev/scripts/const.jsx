var ACTIONS = {};


/*
 * Engine events
 */
ACTIONS.ENGINE_VOLUME_CHANGE = 'ENGINE_VOLUME_CHANGE';
ACTIONS.ENGINE_STATE_CHANGE = 'ENGINE_STATE_CHANGE';
ACTIONS.ENGINE_PROGESS_CHANGE = 'ENGINE_PROGESS_CHANGE';
ACTIONS.ENGINE_BUFFER_CHANGE = 'ENGINE_BUFFER_CHANGE';
ACTIONS.ENGINE_DURATION_CHANGE = 'ENGINE_DURATION_CHANGE';

/*
 * Commands to engine
 */
ACTIONS.PLAY = 'PLAY';
ACTIONS.PAUSE = 'PAUSE';
ACTIONS.TOGGLE_PLAY = 'TOGGLE_PLAY';
ACTIONS.SET_VOLUME = 'SET_VOLUME';
ACTIONS.TOGGLE_VOLUME = 'TOGGLE_VOLUME';
ACTIONS.SET_PROGRESS = 'SET_PROGRESS';
ACTIONS.REPLAY = 'REPLAY';


/*
 * Marker related commands
 */
ACTIONS.OPEN_MARKER = 'OPEN_MARKER';
ACTIONS.CLOSE_MARKER = 'CLOSE_MARKER';

/*
 * Content block  and endscreen actions
 */
ACTIONS.CTA_CLICK = 'CTA_CLICK';
ACTIONS.ENDSCREEN_CTA_CLICK = 'ENDSCREEN_CTA_CLICK';
ACTIONS.ICON_CLICK = 'ICON_CLICK';
ACTIONS.SUBSCRIBE_EMAIL = 'SUBSCRIBE_EMAIL';

/*
 *	 General UI commands
 */
ACTIONS.UNCOLLAPSE_UI = 'UNCOLLAPSE_UI';
ACTIONS.COLLAPSE_UI = 'COLLAPSE_UI';

/*
 * Other UI commands
 */
ACTIONS.SHARE_VIDEO = 'SHARE_VIDEO';
ACTIONS.SHARE_MARKER = 'SHARE_MARKER';
ACTIONS.SET_IS_FULLSCREEN = 'SET_IS_FULLSCREEN';

/*
 *	Misc Commands
 */
ACTIONS.UPDATE_VIDEO_REVISION = 'UPDATE_VIDEO_REVISION';
ACTIONS.UPDATE_PLAYER_SIZE = 'UPDATE_PLAYER_SIZE';
ACTIONS.UPDATE_ENVIRONMENT = 'UPDATE_ENVIRONMENT';
ACTIONS.DESTROY = 'DESTROY';
ACTIONS.DECRYPT_VIDEO = 'DECRYPT_VIDEO';
ACTIONS.RESET = 'RESET';
ACTIONS.PLAYER_HIDDEN = 'PLAYER_HIDDEN';

/*
 * Sharing constants
 */ 
var SHARING = {};
SHARING.FACEBOOK = 'FACEBOOK';
SHARING.TWITTER = 'TWITTER';
SHARING.GPLUS = 'GPLUS';
SHARING.MAIL = 'MAIL';
SHARING.LINK = 'LINK';
SHARING.EMBED = 'EMBED';


/*
 * Player state
 */
var STATES = {
	INITIALIZING: "initializing",
    READY: "ready",
    PAUSED: "paused",
    PLAYING: "playing",
    BUFFERING: "buffering",
    ENDED: "ended",
    ERROR: "error",
    ENCRYPTED: "encrypted"
};

/*
 * UIs
 */
var UIS = {
	REGULAR: "regular",
	MOBILE_PORTRAIT: "mobile_portrait"
};

/*
 * Defaults
 */
var DEFAULT_PLAYER_STATE = {

	state: STATES.INITIALIZING,
	progress: 0,
	buffer: 0,
	volume:1,
	hasPlayed: false,
	duration: 0,

	areControlsCollapsed: false,
	isFullscreen: false,
	isEndscreenShowing: false, 
	isPlayingSuspended: false,
	ui: UIS.REGULAR,

	useSpritePlayback: false,
	allowEngineClickthroughOnStart: false, // needed to start engines on mobile devices
	allowEngineClickthroughWhilePlaying: false, // for now used for youtube annotations support

	openedMarker: false,
	currentMarker: false,
	viewedMarkers: [],

	decryptTries: 0,
	errorMessage: false

};

var DEFAULT_ENVIRONMENT = {
	autoplay: false,

	supportsFullscreen: true,
	supportsVolumeChanges: true,
	supportsNativeSharing: true
};



module.exports = {
	ACTIONS:ACTIONS,
	STATES: STATES,
	SHARING: SHARING,
	DEFAULT_ENVIRONMENT: DEFAULT_ENVIRONMENT,
	DEFAULT_PLAYER_STATE: DEFAULT_PLAYER_STATE,
	UIS: UIS
};