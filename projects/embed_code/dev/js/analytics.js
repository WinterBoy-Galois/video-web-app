
var endpoint = '//www.google-analytics.com/collect?',
	userID = Math.round(Math.random() * 1000000);

function trackEvent(action, dimension1) {
	var params = {
		'v': '1',
		'tid': 'UA-46402960-4',
		't': 'event',
		'cid': userID,
		'cd1': dimension1,
		'z': Math.random(),
		'aip': '1',
		'dl': (document.location+'').substring(0,2000),
		'ec': 'embed actions',
		'ea': action
	};
	var url = endpoint, key;
	for ( key in params ) {
		url += key + '=' + encodeURIComponent(params[key]) + '&';
	}

	if (document.location.protocol == 'https:') {
		url = url.replace('www', 'ssl');
	}

	var img = document.createElement('img');
	img.width = 1;
	img.height = 1;
	img.src = url;
}

function trackThumbnailClick(id) {
	try {
		trackEvent('thumbnail clicked', id);
	} catch(_ignore){}
}

function trackThumbnailLoad(id){
	trackEvent('thumbnail loaded', id);
}

module.exports = {
	trackThumbnailLoad:trackThumbnailLoad,
	trackThumbnailClick:trackThumbnailClick
};