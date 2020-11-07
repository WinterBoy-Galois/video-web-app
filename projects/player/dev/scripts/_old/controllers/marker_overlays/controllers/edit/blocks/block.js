var $ = require('jquery'),
    Marionette = require('marionette'),
    template = require('./block.html');

require('tooltipster');


module.exports = Marionette.LayoutView.extend({

    template: template,
    className: "vp_content_block_edit",

    bindings: {
        ":el": {
            observe: ["id", "type"],
            update: function($el, val) {
                $el.attr("data-id", val[0]);
                $el.addClass("vp_" + val[1]);
            }
        }
    },

    regions: {
        content: ".vp_content"
    },

    behaviors: {
        Stickit: {}
    },

    ui: {
        "deleteButton": ".vp_delete_button"
    },

    events: {
        "click .vp_delete_button": "onDeleteButtonClick",
        "click .vp_minify_button": function() {
            this.trigger("minify");
        }
    },

    onRender: function() {

        // attach tooltipster delete popup
        var _this = this;

        // todo: abstract this into own class
        this.ui.deleteButton.tooltipster({
            content: $('<div>Do you really want to delete this content-block?<br /><div class = "buttons"><div class="button normal">Cancel</div><div class="button red delete">Delete</div></div> </div>'),
            position: "left",
            interactive: true,
            maxWidth: 300,
            positionTracker: true,
            onlyOne: true,
            trigger: 'click',
            theme: "tooltipster-modal",
            functionReady: function(origin, tooltip) {
                tooltip.find(".button").click(function() {
                    if (_this.ui.deleteButton.tooltipster) {
                        _this.ui.deleteButton.tooltipster('hide');
                    }
                });
                tooltip.find(".delete").click(function() {
                    _this.trigger("delete", _this.model.get("id"));
                });
            }
        });

    },

    onDeleteButtonClick: function() {
        this.ui.deleteButton.tooltipster('show');
    }

});