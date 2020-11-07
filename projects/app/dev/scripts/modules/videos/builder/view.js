var $ = require('jquery'),
    Marionette = require('marionette'),
    _ = require('underscore'),
    template = require('./view.html');


var view = Marionette.LayoutView.extend({

    className: "vp_builder",

    events: {

        'click .preview-btn': function() {
            this.trigger("preview_button_clicked");
        },

        'click .publish': function() {
            this.trigger("publish_button_clicked");
        },
        'click .unpublish': function() {
            this.trigger("unpublish_button_clicked");
        },

        'click .toolbar_disabler': 'consumeEvent',
        'click .tool_container': function(e) {
            if (e.target == e.currentTarget) {
                this.hideToolView();
            }
        }
    },

    regions: {
        "toolbar": ".toolbar",
        "tool_container": ".tool_container"
    },

    template: template,

    behaviors: {
        Stickit: {},
    },


    ui: {
        "builderFrame": "#vp_builder_frame",
        "frameOuter": ".iframe_outer",
        "toolContainer": ".tool_container"
    },

    getBuilderFrame: function() {
        return this.ui.builderFrame;
    },

    bindings: {
        ".unpublish": {
            observe: "show_unpublish_button",
            update: function($el, val) {
                $el.toggleClass("vp_removed", !val);
            }
        },
        ".publish.button": "publish_button_title",
        ".toolbar_disabler": {
            observe: "disable_toolbar",
            update: function($el, val) {
                $el.toggleClass("vp_removed", !val);
            }
        },
        "#vp_builder_frame": {
            observe: "builder_url",
            update: function($el, val) {
                $el.attr("src", val);
            }
        },
        ".button_area": {
            observe: ["loading", "iframe_loading"],
            update: function($el, val) {
                var loading = val[0] || val[1];
                $el.toggleClass("vp_loading", loading);
            }
        }
    },

    onRender: function() {
        // hide olark and footer
        $("body").addClass("no_olark");
        $("body").addClass("no_footer");
    },

    onDestroy: function() {
        // show olark and footer
        $("body").removeClass("no_olark");
        $("body").removeClass("no_footer");
    },

    showToolView: function(view) {
        clearTimeout(this.toolResetTimer);
        this.ui.toolContainer.addClass("vp_hidden");
        this.tool_container.show(view);
        this.ui.toolContainer.removeClass("vp_hidden");
    },

    hideToolView: function() {
        this.ui.toolContainer.addClass("vp_hidden");
        var _this = this;
        this.toolResetTimer = setTimeout(function() {
            _this.tool_container.reset();
        }, 200);
    },

    onShow: function() {

        // react to iframe ready
        var frameOuter = this.ui.frameOuter;
        this.ui.builderFrame.ready(function() {
            _.delay(function() {
                frameOuter.removeClass("hidden");
            }, 200);
        });

        this.listenTo(this.tool_container, "empty", function() {
            this.trigger("tool_region_empty");
        });

    },


});
module.exports = view;