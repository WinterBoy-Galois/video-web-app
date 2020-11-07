/*
 *  Help with integrations
 */
var config = require('config');
	$ = require('jquery');

var beaconURLs = {
	mailchimp: config.beaconURL + 'mailchimp/'
};

function loadURL(url, params) {
	var params = $.param(params);
	var url = url + '?' + params;
	var img = new Image();
    img.src = url;
};

function subscribeUser(video_key, service, service_id, email) {

	var params = {
		video_key: video_key,
		list_id: service_id,
		email:email
	};
	loadURL(beaconURLs[service], params);

};

module.exports = {
	subscribeUser:subscribeUser
};