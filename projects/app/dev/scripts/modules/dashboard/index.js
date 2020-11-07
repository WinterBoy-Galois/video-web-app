var $ = require('jquery'),
    analytics = require('analytics'),
    BaseModule = require('../module'),
    Controller = require('./controller'),
    sdk = require('sdk'),
    Videos = require('sdk/models/videos'),
    Team = require('sdk/models/team'),
    DashboardComponent = require('./components/dashboard');


/*
 * Local Storage token
 */
var key = "currentTeam";
var getSavedTeam = function() {
    try {
        return $.localStorage.get(key);
    } catch(_){};
    return false;
};
var setSavedTeam = function(team) {
    try {
        $.localStorage.set(key, team);
    } catch(_){};
};

module.exports = BaseModule.extend({

    appRoutes: {
        "dashboard": "showDashboardView",
        "dashboard/:pid": "showDashboardView",
        "project/:id/videos": "showVideosView",
        "project/:id/videos/:op": "showVideosView",
        "dashboard_new": "showNewDashboardView" // not used
    },

    /* not used */
    showNewDashboardView: function() {
        this.setComponent(DashboardComponent);
    },

    showDashboardView: function(pid, query) {
        var _this = this;
        var params = {'data': {'page':'1',q:''}};
        if (pid != null) {
            params.data.page = pid;
        }
        sdk.teams.fetch(params).then(function() {
            _this.setController(new Controller({
                team: null,
                videos: new Videos(),
                teams:sdk.teams,
                page: pid == null ? 1 : pid
            }));
        });
    },

    showVideosView: function(team_id, op) {
        analytics.trackPage("library");

        var _this = this;
        var team = new Team({id: team_id});
        team.fetch().then(function() {
        //sdk.teams.fetch().then(function(){
            /*
            var team = null;

            if (!team_id) {
                team_id = getSavedTeam();
            }

            // decide which team should be selected
            if (team_id) {
                team = sdk.teams.get(team_id);
            }
            */

            /*
            // first team with videos
            if (!team) {
                team=sdk.teams.find(function(t) {
                    return t.get('stats').number_of_videos > 0;
                });
            }

            // first team (own videos)
            if (!team) {
                team=sdk.teams.at(0);
            }

            */

            var videos = null
            if (team == null) {
                videos = new Videos();
            } else {
                videos = team.videos;
                setSavedTeam(team.get('id'));
            }

            _this.setController(new Controller({
                team:team,
                op: op,
                videos:videos,
                teams:sdk.teams,
                page: null
            }));
        });
        
    }

});
