var $ = require('jquery'),
    query_parameter_helpers = require('_old/util/query_parameters_helpers');

require('jqstorage');


var config = {};

// channel confs
config.channels = {
    api: "videopath.player.api",
    engine: "videopath.player.engine",
    gui: "videopath.player.gui",
    builder: "videopath.player.builder",
    analytics: "videopath.player.analytics"
};


// url vars
config.queryParams = query_parameter_helpers.parseQueryParameters(document.URL);


// basic configuration vars
config.previewMode = config.queryParams.preview;
config.buildMode = config.queryParams.build;
config.videoID = config.queryParams.videoID;
config.revisionID = config.queryParams.revisionID;


// retrieve access token if available
try{
    config.token = $.localStorage.get("token");
} catch(_){}



// environment
var local = window.location.host.indexOf("localhost") >= 0 || window.location.host.indexOf("10.0.2.2") >= 0;
var staging = window.location.host.indexOf("app-dev.") >= 0 || window.location.host.indexOf("player-dev.") >= 0;
var host = window.location.protocol + "//" + window.location.host;

var local_dev_port = process.env.LOCAL_DEV_API_PORT || '5000'

// api base endpoint
if (local) {
    config.apiURL = host + ":" + local_dev_port + "/v1/";
    config.apiURL = config.apiURL.replace("https", "http");
} else if (staging) {
    config.apiURL = "https://api-staging.videopath.com/v1/";
} else {
    config.apiURL = "https://api.videopath.com/v1/";
}

config.beaconURL = config.apiURL + 'beacon/';


// endpoints
config.revisionURL = config.apiURL + "video/{key}/revision/draft/?expanded=1";
config.revisionURL2 = config.apiURL + "video-revision/{key}/?expanded=1";

// methods
config.jpgEndpoint = window.location.protocol + "//az744831.vo.msecnd.net/";


// share url
config.shareBaseURL = staging ? "//player-dev.videopath.com/" : "//player.videopath.com/";

config.statsEndpoint = config.apiURL + 'stats/';


//add events
module.exports = config;

