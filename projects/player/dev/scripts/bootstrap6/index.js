/*
 * Styles
 */
require('css/bootstrap.scss');

/*
 * Items
 */
poster = require('./poster');
button = require('./button');
loader = require('./loader');
message = require('./message');




/*
 * bootstrap api
 */
var bootstrap = {};
document.videopath = document.videopath || {};
document.videopath.player = document.videopath.player ||  {};
document.videopath.player.bootstrap = bootstrap;
/*
 * Config
 */
var conf = document.videopath.player.conf,
    env = require('util/environment').detect();


/*
 * Hack, forward to https if on safari
 * There is a problem with the youtube api and we need to fix that
 * here
 */
/*if ( env.isSafari && !env.loadedSecurely) {
	window.location.href = "https:" + window.location.href.substring(window.location.protocol.length);
}*/

/*
 * Dom References
 */
var vppBootstrap = document.getElementById('vpp_bootstrap');
vppBootstrap.style.removeProperty('display');

/*
 * api functions
 */
bootstrap.remove = function() {
	vppBootstrap.style.pointerEvents = 'none';

	setTimeout(function(){
		vppBootstrap.style.opacity = 0;

	}, 500);

	setTimeout(function(){
		vppBootstrap.style.display = 'none';
	}, 700);
};

/*
 * Detect click on playbutton
 */
if ( !env.platformSupported ) {
	button.hide();
	message.setText('It looks like you have a retro browser. Videopath works on all modern browsers - IE9+, Chrome, Safari, Firefox. Please open in a suitable browser and try again.');
}
else if ( env.isHandheld ) {
	button.hide();
	loader.show();
} else {
	vppBootstrap.onmousedown = function() {
	    bootstrap.playRequested = true;
	    button.hide();
	    loader.show();
	};
}

/*
 * Load main script
 */
if ( env.platformSupported ) {
	var src = conf.srcURL,
	    s = document.createElement('script');
	s.src = src;
	s.async = true;
	document.body.appendChild(s);
}

