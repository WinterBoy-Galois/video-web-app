
var util = require('./util');
var conf = document.videopath.player.conf;

/*
 * Dom References
 */
var vppButton = document.getElementById('vpp_bootstrap_playbutton');
var vppBootstrapArrow = document.getElementById('vpp_bootstrap_arrow'); 

// set up colors
vppButton.style.backgroundColor = conf.buttonColor;
vppBootstrapArrow.style.fill = (conf.buttonColor && util.calculateLuma(conf.buttonColor) > 125 ) ? "#222222" : "#ffffff";
if ( conf.arrowColor ) {
	vppBootstrapArrow.style.fill = conf.arrowColor;
}

module.exports = {
	hide:function(){
		vppButton.style.opacity=0;
	}
};