var config = require('config'),
    sdk = require('sdk'),
    analytics = require('analytics'),
    Backbone = require('backbone'),
    Controller = require('shared/controllers/controller'),
    LoadingService = require('_deprecated/loading_indicator_service'),
    ToolsConfig = require('./tools_config'),
    View = require('./view'),
    ToolbarView = require('./toolbar/view'),
    ModalService = require('shared/services/modal/service'),

    // ops
    publishVideoOp = require('app/operations/publishVideo'),
    unpublishVideoOp = require('app/operations/unpublishVideo'),
    previewVideoOp = require('app/operations/previewVideo'),
    checkAccessOp = require('app/operations/checkAccess'),

    deleteMarkerOp = require('app/operations/deleteMarker'),
    addMarkerOp = require('app/operations/addMarker'),
    deleteMarkerContentOp = require('app/operations/deleteMarkerContent'),
    addMarkerContentOp = require('app/operations/addMarkerContent'),

    addIntegrationOp = require('app/operations/addIntegration');


var selectedTool = false;

module.exports = Controller.extend({

    views: {
        rootView: {
            events: {
                "publish_button_clicked": function() {
                    publishVideoOp({
                        video: this.video
                    }, {
                        successRoute: 'video/' + this.video.get('id') + '/distribute'
                    });
                },
                "unpublish_button_clicked": function() {
                    unpublishVideoOp({
                        video: this.video
                    }, {
                        successRoute: 'dashboard'
                    });
                },
                "preview_button_clicked": function()  {
                    // make sure the player is pausd
                    this.playerAPI.command("pause");
                    previewVideoOp({
                        video: this.video
                    });
                },
                "tool_region_empty": function() {
                    this.views.toolbarView.setSelectedTool(null);
                    selectedTool = false;
                }
            }
        },
        toolbarView: {
            viewClass: ToolbarView,
            region: "toolbar",
            events: {
                "tool_clicked": function(id) {
                    this.showTool(id);
                }
            }
        }
    },

    playerApi: {},

    buildRootView: function() {

        var _this = this;

        this.video = this.options.video;
        this.revision = this.options.revision,
        this.team = this.options.team;


        // expose needed infrastructure for builder
        window.videopath_app = {

            // link to the current revision
            currentVideo: this.revision,  
            currentTeam: this.team,  

            // operations that can be carried out from within the builder
            operations: {
                deleteMarkerOp: deleteMarkerOp,
                addMarkerOp: addMarkerOp,
                deleteMarkerContentOp: deleteMarkerContentOp,
                addMarkerContentOp: addMarkerContentOp,
                addIntegrationOp: addIntegrationOp
            },

            // sdk 
            sdk: sdk,

            // environment
            analytics: analytics,
            modals: ModalService,

            // 
            connect_builder: function(channel) {
                _this.playerAPI = channel;
                _this.connectAPIEvents(channel);
            }


        };


        var builderURL = config.builderURL + "?build=true&videoID=" + this.video.get("id");

        // build view model
        this.viewModel = new Backbone.Model({
            show_unpublish_button: this.video.isPublished(),
            publish_button_title: this.video.isPublished() ? "UPDATE" : "PUBLISH",
            disable_toolbar: false,
            builder_url: builderURL,
            loading: false,
            iframe_loading: false
        });

        // build view
        return new View({
            model: this.viewModel
        });
    },

    onRootViewShow: function() {
        // setup the toolbar config
        this.views.toolbarView.setTools(this.team, ToolsConfig);
    },

    connectAPIEvents: function(api) {

        var model = this.viewModel,
            revision = this.revision;

        this.listenTo(api, "show_overlay show_endscreen", function() {
            model.set({
                disable_toolbar: true
            });
        });

        this.listenTo(api, "hide_overlay hide_endscreen", function() {
            model.set({
                disable_toolbar: false
            });
            revision.save();
        });

        this.listenTo(LoadingService, "ajax_start ajax_stop", function() {
            model.set({
                loading: LoadingService.loading
            });
        });

    },

    showTool: function(id) {

        if (id === selectedTool) {
            this.rootView.hideToolView();
            return;
        }

        this.rootView.hideToolView();

        var viewClass = ToolsConfig[id].view,
            apiCommand = ToolsConfig[id].apiCommand,
            toolbarView = this.views.toolbarView;

        var tool = ToolsConfig[id];

        var _this = this;
        checkAccessOp({}, {
            accessScope: this.options.team,
            requiresFeature: tool.feature,
            featureName: tool.featureName,
            featureDescription: tool.featureDescription
        }).then(function() {
            // if this tool has an api command and playerapi is available, trigger this
            if (apiCommand && _this.playerAPI) {
                _this.playerAPI.command(apiCommand, _this.revision);
            }

            analytics.trackPage("editor/tool/" + id);

            //
            if (!viewClass) {
                return;
            }
            selectedTool = id;

            // mark the right tool as selected
            setTimeout(function() {
                toolbarView.setSelectedTool(id);
            }, 10);

            // build and display view
            var view = new viewClass({
                team: _this.options.team,
                revision: _this.options.revision,
                playerAPI: _this.playerAPI
            });

            _this.rootView.showToolView(view);
        });


    }

});
