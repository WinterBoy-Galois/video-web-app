var config = require('config'),
    $ = require('jquery'),
    Radio = require('radio'),
    Backbone = require('backbone'),
    Marionette = require('marionette'),
    Video = require('sdk/models/video_revision'),
    Marker = require('sdk/models/marker'),
    PlayerState = require('_old/player/models/playerstate'),
    VideoFixture = require('fixtures/video_with_markers'),
    MarkerFixture = require('fixtures/marker_with_contents');


// initial setup

// initial channel setup
var apiChannel = Radio.channel(config.channels.api),
    builderChannel = Radio.channel(config.channels.builder),
    engineChannel = Radio.channel(config.channels.engine);

sinon.stub(apiChannel, 'command');
sinon.stub(builderChannel, 'command');
sinon.stub(engineChannel, 'command');

// create a content region in dom to be able to insert stuff
$(document.body).html("<div id = 'content'></div>");
var App = new Marionette.Application();
App.addRegions({
    'contentRegion': '#content',
});


// helper factories

function rootRegion() {
    // reset region before it is returned to
    // the user
    App.contentRegion.reset();
    return App.contentRegion;
}

function simplePlayerApi() {
    return {
        video: simpleVideo(),
        playerState: playerState(),
        api: apiChannel
    };
}

function playerEngineChannel() {
    return engineChannel;
}

function playerEngineReset() {
    engineChannel.reset();
}

function playerApiChannel() {
    return apiChannel;
}

function playerApiReset() {
    apiChannel.reset();
}

// simple video with some markers
function simpleVideo() {
    var video = new Video();
    var fix = JSON.stringify(VideoFixture);
    fix = JSON.parse(fix);
    video.set(fix);
    return video;
}

function simpleMarker() {
    var marker = new Marker();
    var fix = JSON.stringify(MarkerFixture);
    fix = JSON.parse(fix);
    marker.set(fix);
    return marker;
}

function playerState() {
    return new PlayerState({duration:100});
}


function emptyModel() {
    return new Backbone.Model();
}

function simpleView() {
    return new(Marionette.ItemView.extend({
        template: '<div>hello</div>'
    }))({
        model: emptyModel()
    });
}


module.exports = {
    simplePlayerApi: simplePlayerApi,
    playerApiChannel: playerApiChannel,
    playerApiReset: playerApiReset,
    playerEngineChannel: playerEngineChannel,
    playerEngineReset: playerEngineReset,
    simpleVideo: simpleVideo,
    simpleMarker: simpleMarker,
    simpleView: simpleView,
    playerState: playerState,
    emptyModel: emptyModel,
    rootRegion: rootRegion
};