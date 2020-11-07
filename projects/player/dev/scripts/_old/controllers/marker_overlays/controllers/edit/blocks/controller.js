var _ = require('underscore'),
    Controller = require('shared/controllers/controller'),
    model_factory = require('../../util/block_view_model_factory'),
    View = require('./block');


module.exports = Controller.extend({

    subController: null,

    buildRootView: function() {
        return new View({
            model: this.options.content
        });
    },

    onRootViewShow: function() {

        var saveContent = _.debounce(function(content, viewModel) {
            // translate view model back to model, and perform save
            model_factory.revert(content, viewModel);
            content.save();
        }, 1000);

        if (this.options.blockClass) {

            // create view model
            this.viewModel = model_factory.create(this.options.content);
            this.subController = new this.options.blockClass({
                content: this.viewModel
            });
            this.rootView.content.show(this.subController.rootView);

            // listen to some events
            this.listenTo(this.subController, "changed", function() {
                saveContent(this.options.content, this.viewModel);
            });
        }

    },

    onDestroy: function() {
        if (this.subController) {
            this.subController.destroy();
        }
    },

});