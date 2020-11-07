var Marionette = require('marionette'),
    social_embed_helper = require('_old/util/social_embed_helper'),
    template = require('./view.html');


module.exports = Marionette.LayoutView.extend({

    template: template,
    className: "vp_social vp_website",

    bindings: {

        ".vp_frame_wrapper": {
            observe: ["service_id", "service"],
            update: function($el, val) {
                this.setID(val[1], val[0]);
            }
        },

        ".vp_input_website": {
            observe: "original_url",
            updateView: function(val) {
                this.ui.input.val(val);
            },
            // stop updating model!
            updateModel: function() {}
        },

    },

    ui: {
        "frame_wrapper": ".vp_frame_wrapper",
        "info": ".vp_info",
        input: ".vp_input_website",
        form: ".vp_input_wrapper",
        spinner: ".vp_spinning_coq_big",
        info_text: ".vp_info_text"
    },


    behaviors: {
        SelfTest: {},
        Stickit: {},
        Form: {
            inputGroupSubmit: '.vp_submit_button'
        }
    },

    // showFacebookComments: function() {
    //     social_embed_helper.embedFacebookComments(this.ui.frame_wrapper);
    // },

    showMessage: function(message) {
        try {
            this.ui.input.tooltipster("destroy");
        } catch (_ignore) {}
        this.ui.input.tooltipster({
            content: message,
            trigger: "custom",
            position: "bottom"
        });
        this.ui.input.tooltipster("show");
    },


    setID: function(service, id) {

        try {
            this.ui.input.tooltipster("destroy");
        } catch (_ignore) {}


        var _this = this;

        // reset 
        this.ui.frame_wrapper.empty();
        this.ui.frame_wrapper.hide();
        this.ui.spinner.hide();
        this.ui.info_text.show();

        if (!id) {
            return;
        }

        this.ui.frame_wrapper.show();
        this.ui.spinner.show();
        this.ui.info_text.hide();

        if (service == "twitter") {
            // load Twitter timeline
            social_embed_helper.embedTwitterTimeline(this.ui.frame_wrapper, id).then(function() {
                _this.ui.spinner.hide();
            }, function() {
                _this.showMessage("Twitter Username could not be found.");
            });
        } else if (service == "facebook-page") {
            // load facebook page
            social_embed_helper.embedFacebookPage(this.ui.frame_wrapper, id);

        } else if (service == "pinterest-profile") {
            social_embed_helper.embedPinterestProfile(this.ui.frame_wrapper, id);
        } else if (service == "pinterest-board") {
            social_embed_helper.embedPinterestBoard(this.ui.frame_wrapper, id);
        }

    }

});