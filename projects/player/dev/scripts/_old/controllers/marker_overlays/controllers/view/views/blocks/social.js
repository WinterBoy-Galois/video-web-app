var Marionette = require('marionette'),
    social_embed_helper = require('_old/util/social_embed_helper'),
    template = require('./social.html');


module.exports = Marionette.ItemView.extend({

    template: template,
    className: "vp_marker_overlay_social",

    bindings: {
        ".vp_frame_wrapper": {
            observe: ["data"],
            update: function($el, val) {
                var data = JSON.parse(val);
                this.updateID(data.service, data.service_id);
            }
        }
    },

    behaviors: {
        SelfTest: {},
        Stickit: {}
    },

    ui: {
        frame_wrapper: ".vp_frame_wrapper"
    },

    updateID: function(service, id) {

        var _this = this;

        // reset 
        this.ui.frame_wrapper.empty();

        function complete() {

        }

        // twitter
        if (service === "twitter" && id) {
            // load twitter timeline
            social_embed_helper.embedTwitterTimeline(this.ui.frame_wrapper, id).then(function() {
                // remove the style
                _this.$el.find("iframe").removeAttr('style');
                complete();
            });
        }

        // facebook comments
        else if (service === "facebook-comments") {
            social_embed_helper.embedFacebookComments(this.ui.frame_wrapper).then(complete);
        }

        // facebook page plugin
        else if (service === "facebook-page") {
            social_embed_helper.embedFacebookPage(this.ui.frame_wrapper, id).then(complete);
        } else if (service == "pinterest-profile") {
            social_embed_helper.embedPinterestProfile(this.ui.frame_wrapper, id).then(complete);
        } else if (service == "pinterest-board") {
            social_embed_helper.embedPinterestBoard(this.ui.frame_wrapper, id).then(complete);
        }

    }

});