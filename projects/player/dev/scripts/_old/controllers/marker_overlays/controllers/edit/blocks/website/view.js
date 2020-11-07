var Marionette = require('marionette'),
    template = require('./view.html');


module.exports = Marionette.LayoutView.extend({

    template: template,
    className: "vp_website",

    bindings: {
        ".vp_frame_wrapper iframe": {
            observe: "url",
            update: function($el, val) {
                this.setUrl(val);
            }
        },
        ".vp_input_website": {
            observe: "url",
            updateView: function(val) {
                this.ui.input.val(val);
            },
            // stop updating model!
            updateModel: function() {}
        }

    },

    ui: {
        "frame": ".vp_frame_wrapper iframe",
        "info": ".vp_info",
        input: ".vp_input_website",
        form: ".vp_input_wrapper"
    },

    behaviors: {
        SelfTest: {},
        Stickit: {},
        Form: {
            inputGroupSubmit: '.vp_submit_button'
        }
    },

    setUrl: function(val) {
        if (!val) {
            return;
        }
        this.clearFrame();
        var _this = this;
        this.setTimeout = setTimeout(function() {
            _this.ui.frame.attr("src", val);
        }, 100);
    },

    onDestroy: function() {
        clearTimeout(this.setTimeout);
    },

    clearFrame: function() {
        this.ui.frame.attr("src", "http://about:blank");
        this.ui.info.removeClass("vp_removed");
    },

    setURLInvalid: function() {
        this.ui.form.addClass('vp_invalid');
    }

});