var Marionette = require('marionette');

require('tooltipster');


module.exports = Marionette.ItemView.extend({

    template: "<div> </div>",
    className: "vp_edit_tool",

    bindings: {
        ":el": {
            observe: ["type", "tooltip", "disabled", "disabled_tooltip"],
            update: function($el, val) {
                $el.attr("data-tool", val[0]);
                $el.addClass("vp_" + val[0]);
                $el.toggleClass("vp_tool_disabled", val[2]);

                // dis- or enable draggable
                try {
                    $el.draggable({
                        disabled: val[2]
                    });
                } catch (ignore) {}

                // update tooltip
                var tt = val[2] ? val[3] : val[1];

                // update tooltip message
                try {
                    $el.tooltipster("destroy");
                } catch (ignore) {}
                try {
                    $el.tooltipster({
                        position: "left",
                        onlyOne: true,
                        delay: 500,
                        maxWidth: 200,
                        content: tt
                    });
                } catch (ignore) {}
            },
        }
    },

    behaviors: {
        Stickit: {}
    },

});