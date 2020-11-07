var _ = require('underscore'),
    $ = require('jquery'),
    Marionette = require('marionette'),
    Hammer = require('hammerjs');


// ==== The updated Hammerjs-jQuery-plugin ====
function hammerify(el) {
    var $el = $(el);
    if (!$el.data("hammer")) {
        $el.data("hammer", new Hammer($el[0]));
    }
}

$.fn.hammer = function(options) {
    return this.each(function() {
        hammerify(this, options);
    });
};

// extend the emit method to also trigger jQuery events
Hammer.Manager.prototype.emit = (function(originalEmit) {
    return function(type, data) {
        originalEmit.call(this, type, data);
        $(this.element).trigger({
            type: type,
            gesture: data,
            target: data.target
        });
    };
})(Hammer.Manager.prototype.emit);

// ==== end custom jquery hammer plugin ====


var delegateEventSplitter = /^(\S+)\s*(.*)$/;

var behavior = Marionette.Behavior.extend({

    _hammered: false,

    defaults: {
        stopDefault: true,
        stopClick: true
    },

    initialize: function(opts, view) {
        var oldUndelegate = view.undelegateEvents,
            oldDelegate = view.delegateEvents;

        view.undelegateEvents = _.bind(function() {
            this.undelegateHammerEvents();
            return oldUndelegate.apply(view, arguments);
        }, this);

        view.delegateEvents = _.bind(function() {
            oldDelegate.apply(view, arguments);
            this.delegateHammerEvents();
            return view;
        }, this);
    },

    undelegateHammerEvents: function() {
        if (this._hammered) {
            this.hammer().off('.hammerEvents' + this.view.cid);
        }
    },

    delegateHammerEvents: function() {
        var events = _.result(this.view, 'hammerEvents');

        if (!events) return;

        for (var key in events) {
            var method = events[key];
            if (!_.isFunction(method)) method = this.view[events[key]];
            if (!method) continue;

            var match = key.match(delegateEventSplitter);
            var eventName = match[1],
                selector = match[2];
            eventName += '.hammerEvents' + this.view.cid;

            if (this.options.stopDefault) {
                method = this.stopDefaultAndProcceed(method, this.view);
            } else {
                method = _.bind(method, this.view);
            }

            if (selector === '') {
                this.hammer().on(eventName, method);

                if (this.options.stopClick) {
                    this.$el.on('click', this.stopDefault);
                }

            } else {
                this.hammer().on(eventName, selector, method);

                if (this.options.stopClick) {
                    this.$el.on('click', selector, this.stopDefault);
                }
            }

        }
    },

    stopDefaultAndProcceed: function(method, view) {
        return function(e) {
            var g = (e.originalEvent && e.originalEvent.gesture) || e.gesture,
                ev = g && g.srcEvent;
            if (ev) {
                ev.preventDefault();
                ev.stopPropagation();
            }
            method.apply(view, arguments);
        };
    },

    stopDefault: function(e) {
        e.preventDefault();
        e.stopPropagation();
        return false;
    },

    hammer: function() {
        this._hammered = true;
        return this.view.$el.hammer(this.options);
    }
});

module.exports = behavior;