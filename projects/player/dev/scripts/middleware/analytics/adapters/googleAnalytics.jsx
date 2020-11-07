require('ga');

var _ = require('underscore'),
	adapter = require('./base'),
	ga = window.ga;

var TRACKING_ID = 'UA-46402960-4';

/*
 * Minimal tracking wrapper
 */
function t(revision) {

	var customID = revision.custom_tracking_code,
		key = revision.key;

	// start regular tracking
	ga('create', TRACKING_ID, 'auto', 'videopath');
	ga('videopath.set', 'dimension1', key);
	ga('videopath.set', 'page', '/');
	ga('videopath.send', 'pageview', {sessionControl:'start'});

	// start custom tracking
	if ( customID ) {
		ga('create', customID, 'auto', 'custom');
		ga('custom.set', 'page', '/' + key);
		ga('custom.send', 'pageview', {sessionControl:'start'});
	}

	// helper for cleaning strings
	function clean(string) {
		string = string ? string : '';
		try { string = string.toLowerCase(); } catch(_){}
		return string;
	};

	return function(name, label) {
		var category = 'player actions'; name = clean(name); label = clean(label);
		ga('videopath.send', 'event', category, name, label, {transport: 'beacon'});
		if (customID) {
			ga('custom.send', 'event', category, name, label, {transport: 'beacon'});
		}
	};

};
var tracker = function(){};


var EVENTS = {
	// user actions
	READY: "pathplayer ready",
    PLAY: "play",
    PLAY6: "play6",
    PAUSE: "pause",
    REPLAY: "replay",
    ENDED: "video ended",
    QUARTILE: 'quartile',

    HIDE_OVERLAY: "hide overlay",
    SHOW_OVERLAY: "show overlay",
    TOGGLE_FULLSCREEN: "toggle fullscreen",
    TOGGLE_VOLUME: "toggle volume",
    SHARE_VIDEO: "share video",
    CLICK: "click",
    CLICK_CTA: "click cta",
    CLICK_ENDSCREEN_CTA: "click endscreen cta",
    CLICK_ICON: "click icon",
    SUBSCRIBE_EMAIL: "subscribe email",

    PLAYER_LOADING: "pathplayer loading",
    
};

module.exports = _.extend({}, adapter, {

	init: function(revision) {
		tracker = t(revision);
		tracker(EVENTS.PLAYER_LOADING);
	},

	ready: function() {
		tracker(EVENTS.READY);
	},

	play: function() {
		tracker(EVENTS.PLAY);
	},

	time: function(seconds) {
		if ( seconds == 6 ) {
			tracker(EVENTS.PLAY6);
		}
	},

	quartile: function(index) {
		tracker(EVENTS.QUARTILE, index);
	},

	pause: function() {
		tracker(EVENTS.PAUSE);
	},

	ended: function() {
		tracker(EVENTS.ENDED);
	},

	replay: function() {
		tracker(EVENTS.REPLAY);
	},

	openMarker: function(key) {
		tracker(EVENTS.SHOW_OVERLAY, key);
	},

	closeMarker: function() {
		tracker(EVENTS.HIDE_OVERLAY);
	},

	subscribeEmail: function() {
		tracker(EVENTS.SUBSCRIBE_EMAIL);
	},

	clickCTA: function(url) {
		tracker(EVENTS.CLICK_CTA, url);
	},

	clickEndscreenCTA: function() {
		tracker(EVENTS.CLICK_ENDSCREEN_CTA);
	},

	clickIcon: function () {
		tracker(EVENTS.CLICK_ICON);
	},

	toggleVolume: function() {
		tracker(EVENTS.TOGGLE_VOLUME);
	},

	toggleFullscreen: function() {
		tracker(EVENTS.TOGGLE_FULLSCREEN);
	},

	shareVideo: function(service) {
		tracker(EVENTS.SHARE_VIDEO, service);
	},

});