var Marionette = require('marionette'),
    _ = require('underscore');


var SHARE_CLOSE_TIMEOUT = 2500;

var behavior = Marionette.Behavior.extend({

    events: {
        "mousemove .vp_share_buttons": "onShareMouseMove",
        "mouseleave .vp_share_buttons": "onShareMouseOut",
        "click .vp_share_button": "onShareClick",
        "touchstart .vp_share_button": "onShareClick",
    },

    ui: {
        shareButtons: '.vp_share_buttons'
    },

    onRender: function() {
        var $el = this.ui.shareButtons,
            model = this.view.model;

        // model bindings
        function updateShowShareButtons() {
            var val = model.get('show_share_buttons');
            $el.toggleClass("vp_removed", !val);
        }
        this.view.listenTo(model, 'change:show_share_buttons', updateShowShareButtons);
        updateShowShareButtons();

        // keep reseting timeout on sharelinks interaction
        $el.find('.vp_share_links')
            .on('touchstart touchend touchmove mousemove', _.bind(function() {
                this.resetShareTimeout();
            }, this));
    },

    onDestroy: function() {
        this.ui.shareButtons.find('.vp_share_links').off();
        clearTimeout(this.ui.shareButtons._closeTimeout);
    },

    onShareMouseOut: function() {
        this.closeShareBtns();
    },

    onShareMouseMove: function() {
        if (!this.ui.shareButtons._open) {
            setTimeout(_.bind(this.openShareBtns, this), 10);
        }
        _.throttle(_.bind(this.resetShareTimeout, this), 300);
    },

    onShareClick: function(e) {
        e.preventDefault();
        if (this.ui.shareButtons._open) {
            this.closeShareBtns();
        } else {
            this.openShareBtns();
        }
    },

    openShareBtns: function() {
        this.ui.shareButtons._open = true;
        this.ui.shareButtons.addClass('vp_hover');
        this.resetShareTimeout();
    },

    closeShareBtns: function() {
        this.ui.shareButtons._open = false;
        this.ui.shareButtons.removeClass('vp_hover');
        clearTimeout(this.ui.shareButtons._closeTimeout);
    },

    resetShareTimeout: function() {
        clearTimeout(this.ui.shareButtons._closeTimeout);
        this.ui.shareButtons._closeTimeout =
            setTimeout(_.bind(function() {
                this.closeShareBtns();
            }, this), SHARE_CLOSE_TIMEOUT);
    },

});

module.exports = behavior;