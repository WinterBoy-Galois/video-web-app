var  $ = require('jquery'),
    
    analytics = require('analytics'),
    Marionette = require('marionette'),
    BaseModule = require('../module'),
    BuilderController = require('./builder/controller'),
    ShareController = require('./share/controller'),

    HistoryComponent = require('./history'),
    AnalyticsComponent = require('./analytics'),
    BuilderComponent = require('./builder_new'),

    sdk = require('sdk');



function loadModels(video_id) {

    var dfd = new $.Deferred();
    sdk.videos.fetchById(video_id).then(function(video) {
        video.loadRevisionDraft().then(function(revision) {
            sdk.teams.fetchById(video.get('team')).then(function(team){
                dfd.resolve({
                    team:team, 
                    video:video, 
                    revision:revision,
                    revisions:video.revisions
                });
            });
        });
    }).fail(function() {
        Marionette.App.route("dashboard");
        dfd.reject();
    });
    return dfd.promise();
}


module.exports = BaseModule.extend({

    appRoutes: {

        "video/:id/edit": function(video_id) {
            analytics.trackPage("editor");
            this.showController(video_id, BuilderController);
        },

        "video/:id/edit_new": function(video_id) {
            analytics.trackPage("editor");
            this.showComponent(video_id, BuilderComponent);
        },

        "video/:id/distribute": function(video_id) {
            analytics.trackPage("share");
            this.showController(video_id, ShareController);
        },

        "video/:id/history": function(video_id) {
            analytics.trackPage('history');
            this.showComponent(video_id, HistoryComponent);
        },

        "video/:id/analytics": function(video_id) {
            analytics.trackPage("analytics");
            this.showComponent(video_id, AnalyticsComponent);
        },

    },


    showController: function(video_id, ControllerClass) {
        var _this = this;
        loadModels(video_id).then(function(result){
            _this.setController(new ControllerClass(result));
        });
    },

    showComponent: function(video_id, ComponentClass) {
        var _this = this;
        loadModels(video_id).then(function(result){
            _this.setComponent(ComponentClass, result);
        });
    }

});
