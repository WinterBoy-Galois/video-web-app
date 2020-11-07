var _ = require('underscore'),
    Controller = require('shared/controllers/controller'),
    View = require('./views/edit_layout'),
    EditController = require('./edit_controller'),
    PreviewController = require('../view/controller'),
    ModelFactory = require('../util/model_factory'),
    StateModel = require('../models/edit_state');


module.exports = Controller.extend({

    editState: new StateModel(),
    editController: null,
    previewController: null,

    views: {

        editView: {
            factory: function(c) {
                return c.editController.rootView;
            },
            region: "editRegion",
        }
    },

    buildRootView: function() {
        this.editController = new EditController(this.options);

        var view = new View({
            model: ModelFactory.create(this.options.video, this.editState)
        });

        return view;
    },

    onRootViewShow: function() {
        this.setupEvents();
    },

    onDestroy: function() {
        if (this.editController) this.editController.destroy();
    },

    setupEvents: function() {
        this.listenTo(this.rootView, 'preview_button_clicked', this.togglePreview);
        this.listenTo(this.rootView, 'done_button_clicked', this.handleDone);
    },

    openPreview: function() {
        this.previewController = new PreviewController(_.extend({}, this.options, {
            disabled: true,
            editState: this.editState
        }));
        this.rootView.previewRegion.show(this.previewController.rootView);
        this.editState.set('state', this.editState.states.PREVIEW);
    },

    hidePreview: function() {
        this.rootView.previewRegion.reset();
        if (this.previewController) this.previewController.destroy();
        this.editState.set('state', this.editState.states.EDIT);
    },

    togglePreview: function() {
        if (this.editState.get('state') === this.editState.states.EDIT) {
            this.openPreview();
        } else {
            this.hidePreview();
        }
    },

    handleDone: function() {
        this.options.api.command('hide_endscreen');
    }

});