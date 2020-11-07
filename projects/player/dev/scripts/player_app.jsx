/*
 * 	Entry point for player
 */ 

var config = require('config'),
	React = require('react'),
	ReactDom = require('react-dom'),
	Player = require('mainContainers/player'),
	getQueryParameters = require('util/getQueryParameters');

// fetch and promises polyfills
require('whatwg-fetch');
require('es6-promise');

function renderPlayer(videoRevision) {
	ReactDom.render(
		<Player videoRevision={videoRevision}/>,
		document.getElementById("vpp_player_app"),
		function(){
			document.videopath.player.bootstrap.remove();
		}
	);
};


var queryParams = getQueryParameters();

// if we have a dedicated video url to load, get that
if ( queryParams.videoID ) {
	var token = config.token,
		url = config.revisionURL.replace("{key}", queryParams.videoID),
		headers = {
			"Authorization": "Token " + token,
		};
	fetch(url,{headers:headers}).then(function(response){
		return response.json();
	}).then(renderPlayer);
} 

// otherwise load video that is defined in html template
else {
	renderPlayer(document.videopath.player.conf.video);
}

