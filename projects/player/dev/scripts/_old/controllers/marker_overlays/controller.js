var _ = require('underscore'),
    Controller = require('shared/controllers/controller'),
    StateModel = require('./models/state'),
    LayoutView = require('./views/layout'),
    ViewController = require('./controllers/view/controller'),
    EditController = require('./controllers/edit/controller');


module.exports = Controller.extend({

    buildRootView: function() {
        this.overlayState = new StateModel();
        return new LayoutView({
            model: this.overlayState
        });
    },

    onRootViewShow: function() {
        this.setupStateReactions();
        this.setupEvents();
    },

    setupStateReactions: function() {

        this.listenTo(this.options.playerState, "change:open_marker", function(state, marker_id) {
            if (marker_id < 0) {
                this.hideOverlay();
            } else {
                this.showOverlay(marker_id);
            }
        });

    },

    setupEvents: function() {
        this.listenTo(this.rootView, "click", function(clickPosition) {
            this.options.api.command("hide_marker_content");
            this.trigger('background_clicked', clickPosition);
        });
    },

    showOverlay: function(id) {

        if (this.currentController) {
            this.currentController.destroy();
            this.currentController = null;
        }

        // get marker
        // TODO: move this to api/models
        var marker = this.options.video.markers.get(id);
        if (!marker) {
            marker = this.options.video.markers.findWhere({
                key: id
            });
        }
        if (!marker) {
            return;
        }

        // build correct controller
        var controller,
            options = _.clone(this.options);
        options.marker = marker;
        options.overlayState = this.overlayState;

        if (this.options.playerState.get("mode") === this.options.playerState.modes.BUILDER) {
            this.overlayState.set({
                state: this.overlayState.states.EDIT
            });
            controller = new EditController(options);
        } else {
            controller = new ViewController(options);
        }

        // require the large content
        // currently only used for the website
        this.rootView.showOverlay(controller.rootView);
        this.currentController = controller;
    },

    hideOverlay: function() {
        if (this.currentController) {
            this.currentController.destroy();
            this.currentController = null;
        }
        this.rootView.hideOverlay();
    },

});