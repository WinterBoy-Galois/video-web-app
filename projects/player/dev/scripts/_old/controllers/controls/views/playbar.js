var Marionette = require('marionette'),
    template = require('./playbar.html');

require('stickit');


module.exports = Marionette.LayoutView.extend({

    template: template,
    className: "vp_playbar",
    regions: {
        "indicatorsWrapper": ".vp_indicators_wrapper"
    },

    lastTouchEvent: null,

    bindings: {

        // bind progress values
        '.vp_progress': {
            observe: ['play_progress', 'play_progress_dragged'],
            update: function($el, val) {
                $el.css("height", ((val[1] || val[0]) * 100) + "%");
            }
        },

        '.vp_buffer': {
            observe: 'buffer_progress_normalized',
            update: function($el, val) {
                $el.css("height", (val * 100) + "%");
            }
        },

        '.vp_time': 'play_progress_string',

        '.vp_knob': {
            observe: ['play_progress', 'play_progress_dragged', 'show_knob'],
            update: function($el, val) {
                var progress = val[0],
                    dragged = val[1],
                    knob = val[2];

                $el.css("top", ((dragged || progress) * 100) + "%");
                $el.toggleClass("vp_show_knob", knob);
            }
        },

        ':el': {
            observe: 'show_playbar',
            update: function($el, val) {
                $el.toggleClass("vp_removed", !val);
            }
        }
    },

    behaviors: {
        SelfTest: {},
        Stickit: {},
        PlayerResize: {
            onShow: true
        },

    },

    ui: {
        "bar": ".vp_bar",
        "scrubber": ".vp_scrubber",
        "indicatorsWrapper": ".vp_indicators_wrapper"
    },

    events: {
        "mousemove .vp_capture_mouse": "onMouseMove",
        "mouseup .vp_capture_mouse": "onMouseUp",
        "mousedown .vp_capture_mouse": "onMouseDown",
        "touchmove .vp_capture_mouse": "onTouchMove",
        "touchend .vp_capture_mouse": "onTouchEnd",
        "touchstart .vp_capture_mouse": "onTouchStart",
        "mouseleave .vp_capture_mouse": "onMouseLeave"
    },

    onPlayerResize: function() {
        if (this.ui.bar.offset) {
            this.barOffsetTop = this.ui.bar.offset().top;
            this.barHeight = this.ui.bar.height();
        }
    },

    // event helpers
    percentForY: function(y) {
        y = y - this.barOffsetTop;
        return y / this.barHeight;
    },

    // touch events
    onTouchStart: function() {

    },

    onTouchMove: function(e) {
        this.lastTouchEvent = e;
        var percent = this.percentForY(e.originalEvent.touches[0].clientY);
        this.trigger("progress_dragged", percent);
    },

    onTouchEnd: function() {
        var percent = this.percentForY(this.lastTouchEvent.originalEvent.touches[0].clientY);
        this.trigger("progress_selected", percent);
    },

    // mouse events
    onMouseDown: function() {
        this.mouseDown = true;
        this.barOffsetTop = this.ui.bar.offset().top;
        this.barHeight = this.ui.bar.height();
    },

    onMouseMove: function(e) {
        var percent = this.percentForY(e.clientY);
        this.ui.scrubber.css("top", percent * 100 + "%");
        if (this.mouseDown) {
            this.trigger("progress_dragged", percent);
        }
    },

    onMouseUp: function(e) {
        var percent = this.percentForY(e.clientY);
        this.trigger("progress_selected", percent);
        this.mouseDown = false;
    },

    onMouseLeave: function() {
        this.trigger("progress_drag_ended");
        this.mouseDown = false;
    }

});