var Marionette = require('marionette'),
    $ = require('jquery'),
    template = require('./passwordview_template.html');


var currentDfd = null;
var rendered = false;

var view = Marionette.ItemView.extend({

    // do stuff
    className: "vp_password_view vp_hidden",
    template: template,

    ui: {
        "info": ".vp_info",
        "input": "input"
    },

    events: {
        "click button": "submit",
        "keyup input": "onKeyUp"
    },

    getPassword: function(prompt) {

        currentDfd = new $.Deferred();

        prompt = prompt || "This Video is password protected.";

        if (!rendered) {
            this.render();
            $("#vp_bootstrap").after(this.$el);
            rendered = true;
        }

        this.ui.info.html(prompt);
        this.ui.input.val("");

        var _this = this;
        setTimeout(function() {
            _this.$el.removeClass("vp_hidden");
        }, 200);

        return currentDfd.promise();
    },

    submit: function() {
        this.$el.addClass("vp_hidden");
        var _this = this;
        setTimeout(function() {
            if (currentDfd) {
                currentDfd.resolve(_this.ui.input.val());
                currentDfd = null;
            }
        }, 200);
    },

    onKeyUp: function(e) {
        if (e.keyCode == 13) {
            this.submit();
        }
    }

});
module.exports = view;