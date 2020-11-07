var _ = require('underscore'),
    Marionette = require('marionette'),
    Controller = require('shared/controllers/controller'), // Marionette controller customized
    View = require('./views/dashboard'),
    $ = require('jquery'),
    sdk = require('sdk'),

    // ops
    deleteVideoOp = require('app/operations/deleteVideo'),
    deleteMultipleVideoOp = require('app/operations/deleteMultipleVideo'),
    duplicateVideoOp = require('app/operations/duplicateVideo'),
    duplicateProjectOp = require('app/operations/duplicateProject'),
    previewVideoOp = require('app/operations/previewVideo'),
    showWelcomeOp = require('app/operations/showWelcomeModal'),
    showStartVideoOp = require('app/operations/showStartVideoModal'),
    showChangeSourceOp = require('app/operations/showChangeSourceModal'),
    editVideoOp = require('app/operations/editVideo');

    deleteTeamOp = require('app/operations/deleteTeam');

function showStartVideoOverlay(video) {

    var team = this.options.team;
    var result;
    if (video) {
        result = showChangeSourceOp({
            video: video,
            team:team
        }, {
            accessScope:team
        });
    } else {
        result = showStartVideoOp({
            team:team
        });
    }
    result.then(this.options.videos.refresh.bind(this.options.videos));
}

function addVideoToProject(team) {
    result = showStartVideoOp({
        team:team
    });
}

module.exports = Controller.extend({

    views: {
        rootView: {
            events: {
                "start_video_clicked": function(video) {
                    showStartVideoOverlay.bind(this)(video);
                },
                "video:view_clicked": function(video) {
                    previewVideoOp({
                        video: video.model
                    });
                },
                "video:edit_clicked": function(video) {
                    editVideoOp({
                        video: video.model
                    });
                },
                "video:delete": function(video) {
                    deleteVideoOp({
                        video: video.model
                    });
                },
                "video:revisions": function(video) {
                    Marionette.App.route("video/" + video.model.get('id') + "/history");
                },
                "video:duplicate": function(video) {
                    var _this = this;
                    duplicateVideoOp({
                        video: video.model
                    }, {
                        accessScope: this.options.team
                    }).then(function() {
                        _this.fetchVideos(1, _this.lastQuery, true);
                    });
                },
                "video:change_source": function(video) {
                    showStartVideoOverlay.bind(this)(video.model);
                },
                "video:analytics_clicked": function(video, id) {
                    Marionette.App.route("video/" + id + "/analytics");
                },
                "video:share_clicked": function(video, id) {
                    Marionette.App.route("video/" + id + "/distribute");
                },
                "video_search_field_changed": function(term) {
                    this.fetchVideoDebounced(1, term);
                },
                "video:item_checked": function(video, data) {
                    if(!this.checkedVideos){
                        this.checkedVideos = [];
                    }

                    if (data.selected) {
                        this.checkedVideos.push(video.model);
                    } else {
                        this.checkedVideos.pop(video.model);
                    }
                },
                "project:addvideo": function(project) {
                    addVideoToProject.bind(this)(project.model);
                },
                "project:delete": function(project) {
                    deleteTeamOp({team:project.model});
                },
                "project:duplicate": function(project) {
                    var _this = this;
                    duplicateProjectOp({
                        team:project.model
                    }).then(function() {
                        _this.fetchProjects(1, _this.lastQuery, true);
                    });
                },
                "project:edit_theme": function(project) {
                    Marionette.App.route("theme/" + project.model.get('id'));
                },
                "project:apps": function(project) {
                    // TODO
                },
                "project:member_settings": function(project) {
                    Marionette.App.route("members/" + project.model.get('id'));
                },
                "project:project_settings": function(project) {
                    Marionette.App.route("project/" + project.model.get('id'));
                },
                "project:project_selected": function(project, id) {
                    if ( id == 'new' ) {
                        Marionette.App.route('projects');
                        return;
                    }
                    Marionette.App.route('project/' + id + '/videos');
                },
                "delete_checked": function() {
                    // delete checked videos
                    if(!this.checkedVideos){
                        return;
                    }
                    deleteMultipleVideoOp({
                        videos: this.checkedVideos
                    });
                },
                "project_search_field_changed": function(term) {
                    this.fetchProjectDebounced(1, term);
                },
                "paginator_clicked": function(page_no) {
                    this.fetchVideos(page_no, this.lastQuery);
                },
                "back_button_clicked": function() {
                    Marionette.App.route("dashboard");
                },
                "teampaginator_clicked": function(page_no) {
                    Marionette.App.route("dashboard/" + page_no);
                },
                "team_selected": function(team_id) {
                    if ( team_id == 'new' ) {
                        Marionette.App.route('projects');
                        return;
                    }
                    Marionette.App.route('project/' + team_id + '/videos');
                },
                "manage_projects": function() {
                    Marionette.App.route('projects');
                },
                "sort_clicked": function(field, up) {
                    console.log('sort', field, up); // todo delete
                    this.fetchVideos(1, this.lastQuery);
                },                
            }
        }
    },

    buildRootView: function() {
        this.fetchVideoDebounced = _.debounce(this.fetchVideos, 1000);
        this.fetchProjectDebounced = _.debounce(this.fetchProjects, 1000);

        // load main dashboard view with videos or projects
        if(this.options.team != null) {
            // show videos list
            return new View({
                collection: this.options.videos,
                view_type: 'videos',
            });
        } else {
            // show projects list
        return new View({
                collection: this.options.teams,
                view_type: 'projects',
        });
        }        
    },


    fetchVideos: function(page, query, force) {
        var _this = this;

        if (page == this.lastPage && query == this.lastQuery && !force) {
            return;
        }
        this.lastPage = page;
        this.lastQuery = query;


        this.rootView.setPaginator(0, 0);
        this.options.videos.reset();
        return this.options.videos.fetch({
            data: {
                page: page,
                q: query
            }
        }).then(function() {
            _this.rootView.setPaginator(page, Math.ceil(_this.options.videos.count / 20)) // quick fix since _this.options.videos.page_size)); not seems to be available
        });
    },

    /* manual manipulation of dom, move as a new composite move in future */
    fetchProjects: function(page, query, force) {
        var _this = this;

        if (page == this.plastPage && query == this.plastQuery && !force) {
            return;
        }
        this.plastPage = page;
        this.plastQuery = query;

        this.rootView.setTeamPaginator(0, 0);
        this.options.teams.reset();
        $(".projects").empty();

        return this.options.teams.fetch({
            data: {
                page: page,
                q: query
            }
        }).then(function() {
            _this.onRootViewShow();
        });
    },

    onRootViewShow: function() {
        var _this = this;
        
        if(this.options.team != null) {
            this.rootView.setProjectTitle(this.options.team.attributes.name);

            this.fetchVideos(1, '').then(function(){
                $(".projects_container").hide();
                $(".videos_navbar").show();
                $(".vp_history_back_button").show();
                $(".teampaginator").hide();
                if(_this.options.op == 'new') {
                    showStartVideoOp({ team:_this.options.team });
                } else if (_this.options.op == 'blank') {
                } else {
                    if (_this.options.videos.length == 0 ) {
                        showWelcomeOp({team:_this.options.team});
                    }
                }

            });
        }

        if ( this.options.teams.length > 1 || sdk.currentUser.canUseFeature('teams') ) {
            this.rootView.setTeamPaginator(this.options.page, Math.ceil(_this.options.teams.count / 20)); // quick fix since _this.options.videos.page_size)); not seems to be available
        }
    },


});
