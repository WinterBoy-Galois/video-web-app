var _ = require('underscore'),
    Backbone = require('backbone'),
    Controller = require('shared/controllers/controller'),
    LayoutView = require('shared/services/modal/layout');


module.exports = Controller.extend({

    contentController: null,

    views: {
        contentView: {
            factory: function(c) {
                return c.contentController.rootView;
            },
            region: 'contentRegion',
            events: {
                'close_modal': function() {
                    this.closeModal();
                }
            }
        },

        rootView: {
            events: {
                'close_modal': function() {
                    this.closeModal();
                },
                'button_action': function(btnTitle) {
                    _.find(this.contentController.modalOptions.buttons, function(btn) {
                        return btn.title === btnTitle;
                    }).onClick.call(this.contentController);

                }
            }
        }
    },

    buildRootView: function() {
        this.processOptions();

        var vm = this.createViewModel();
        return new LayoutView({
            model: vm
        });
    },

    processOptions: function() {
        var _this = this;
        if (this.getOption('contentController')) {
            this.contentController = this.getOption('contentController');
            this.listenTo(this.contentController, 'close_modal', function() {
                _this.closeModal();
            });
        }
    },

    createViewModel: function() {
        return new Backbone.Model(this.contentController.modalOptions);
    },

    onRootViewShow: function() {},

    onDestroy: function() {
        this.contentController && this.contentController.destroy();
    },

    closeModal: function() {
        var _this = this;
        this.rootView.fadeOut(function() {
            _this.trigger('modal_closed');
        });
    },

    showModal: function() {
        this.rootView.fadeIn();
    }
});