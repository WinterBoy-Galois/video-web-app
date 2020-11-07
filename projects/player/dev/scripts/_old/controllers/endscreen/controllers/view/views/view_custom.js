var $ = require('jquery'),
    Marionette = require('marionette'),
    template = require('./view_custom.html');

require('tinycolor');


module.exports = Marionette.ItemView.extend({
    template: template,
    className: "vp_endscreen_view_custom",

    bindings: {

    },

    behaviors: {
        Stickit: {},
        SelfTest: {},
    },

    ui: {
        "iframe": "iframe"
    },

    onShow: function() {

        // load url
        var iframe = this.ui.iframe;
        iframe.attr("src", this.model.get("endscreen_url"));
        iframe.ready(function() {
            iframe.removeClass("vp_hidden");
        });

        // attach to replay message
        $(window).on("message", this, function(e) {
            var message = e.originalEvent.data;
            // check if source && message are right
            if (e.originalEvent.source === e.data.$el.find("iframe")[0].contentWindow && message === "reload") {
                e.data.onRewatchClicked();
            }
            $(window).off("message", e.data.handleIframeMessage);
        });
    },

    onRewatchClicked: function() {
        this.trigger("rewatch");
    },


});