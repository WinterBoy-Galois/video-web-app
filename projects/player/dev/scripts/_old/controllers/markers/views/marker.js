var $ = require('jquery'),
    Marionette = require('marionette'),
    template = require('./marker.html');

require('jquery_ui');


module.exports = Marionette.ItemView.extend({

    template: template,
    className: "vp_marker_wrapper",

    bindings: {
        // workaround, attach observer to marker inner,
        // but actually we're observing for the whole marker
        ":el": {
            observe: ['offset', 'opened', 'collapsed', 'current', 'hidden', 'isAddMarker', 'shifted', 'fixed_width', 'isBrandedMarker'],
            update: function($el, val) {


                if (!val[5]) {
                    $el.css("top", val[0]);
                }
                // add active tag for active marker
                $el.toggleClass("vp_opened", val[1] === true);
                $el.toggleClass("vp_collapsed", val[2] === true);
                $el.toggleClass("vp_current", val[3] === true);
                $el.toggleClass("vp_removed", val[4] === true);
                $el.toggleClass("vp_shifted", val[6] === true);
                $el.toggleClass("vp_fixed_width", val[7] === true);
                $el.toggleClass("vp_branded_marker", val[8] === true);
            }
        },
        ".vp_title": {
            observe: ["title", "temp_title"],
            update: function($el, val) {
                $el.text(val[0]);
                // hide main title when temp title is set
                var opacity = (val[1] && val[1] !== "") ? 0 : 1;
                $el.css("opacity", opacity);
            }
        },
        ".vp_temp_title": "temp_title",
        ".vp_marker_inner": {
            observe: "tooltip_title",
            update: function($el, val) {
                if (val) {
                    $el.tooltipster({
                        position: "right",
                        onlyOne: true,
                        delay: 500,
                        maxWidth: 200,
                        content: val,
                        contentAsHTML: true
                    });
                }
            }
        }
    },

    behaviors: {
        Stickit: {},
        SelfTest: {},
        Fading: {},
    },

    ui: {
        "inner": ".vp_marker_inner"
    },

    events: {
        "click": "onClick",
        "touchend": "onTouchEnd"
    },

    onRender: function() {
        this.$el.data('markerId', this.model.get('id'));
    },

    onClick: function(e) {
        e.stopPropagation();
        if (!this.model.get('collapsed') || this.model.get('current')) {
            this.trigger("click", this.model.get("id"));
            try {
                this.ui.inner.tooltipster("hide");
            } catch (ignore) {}

        }
    },

    onTouchEnd: function(e) {
        // Trigger click manually cause touchdefaults
        // are prevented in parent view,
        // for consistency on all browsers
        $(e.currentTarget).trigger('click');
    },

    onShow: function() {
        this.listenTo(this.model, "change:draggable", function() {
            this.toggleDraggable();
        });
        this.toggleDraggable();
    },

    toggleDraggable: function() {
        var draggable = this.model.get("draggable");
        if (draggable) {
            this.enableDraggable();
        } else {
            this.disableDraggable();
        }
    },

    enableDraggable: function() {
        var
            _this = this;

        var dragSettings = {
            delay: 50,
            snap: ".vp_markers_snap_target",
            containment: ".vp_markers",
            start: function(e, ui) {
                _this.trigger("start_drag", ui.position);
                try {

                    _this.ui.inner.tooltipster("hide");
                } catch (ignore) {}
            },
            drag: function(e, ui) {
                _this.trigger("drag", ui.position);
            },
            stop: function(e, ui) {
                _this.$el.css("left", "0px");
                _this.trigger("end_drag", ui.position);
            },
        };

        // only contain within markers if this is not the
        // special add marker
        if (this.model.get("isAddMarker")) {
            dragSettings.containment = ".vp_add_marker_drag_container";
        }

        this.$el.draggable(dragSettings);
    },

    disableDraggable: function() {
        if (this.$el.hasClass("ui-draggable")) {
            this.$el.draggable("destroy");
        }
    }

});