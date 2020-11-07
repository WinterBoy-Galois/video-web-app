var $ = require('jquery'),
    Marionette = require('marionette'),
    template = require('./website.html');


function preventFrameNavigation() {
    return "You are currently viewing a website in a Videopath iFrame, are you sure you want to navigate to another URL?";
}

module.exports = Marionette.ItemView.extend({

    template: template,
    className: "vp_marker_overlay_website",

    bindings: {
        ".vp_frame": {
            observe: ["data", "url"],
            update: function($el, val) {

                // unwrap data to get at url
                this.setUrl(val[1]);
            }
        },
    },

    behaviors: {
        SelfTest: {},
        Stickit: {}
    },

    ui: {
        frame: ".vp_frame",
        info: ".vp_info"
    },

    setUrl: function(val) {

        // fix https websites
        if (window.location.protocol == 'https:') {
            val = val.replace("http:", "https:");
        }

        var _this = this;
        this.ui.frame.load(function() {
            _this.ui.frame.unbind();
            _this.ui.info.addClass("vp_done");
        });
        this.ui.frame.attr("src", val);

    },

    onShow: function() {
        $(window).bind('beforeunload', preventFrameNavigation);

    },

    onDestroy: function() {
        $(window).unbind('beforeunload', preventFrameNavigation);
    }

});