var _ = require('underscore'),
    $ = require('jquery'),
    Marionette = require('marionette'),
    MobileService = require('shared/util/browser_support_helpers');


var delegateEventSplitter = /^(\S+)\s*(.*)$/,
    fastClickClass = 'vp_custom_touch',
    needFastClick = MobileService.needFastClick;

var behavior = Marionette.Behavior.extend({

    // Configuration properties
    defaults: {
        // stops the touch event after triggering the click
        immediateStop: false,
        // a view property, that is checked each time a click should be triggered,
        // and stops the click if that prop is truthy.
        // this is usefull to implement drag and preventing the touchend
        // to trigger click
        clickStopProperty: "",
        // indicates if the clickStopProperty should be unset after the
        // click is prevented
        clearStopProperty: false
    },

    clickSelectors: [],

    needFastClick: needFastClick,

    initialize: function(opts, view) {
        var oldDelegate = view.delegateEvents;

        view.delegateEvents = _.bind(function() {
            this.processClickEvents();
            oldDelegate.apply(view, arguments);
            return view;
        }, this);

        view.fastClick = _.bind(this.fastClick, this);

        this.clickStopProperty = this.getOption('clickStopProperty');
    },

    processClickEvents: function() {
        var events = _.result(this.view, 'events'),
            newEvents = {};

        this.view.$el.addClass(fastClickClass);

        if (!events) return;

        for (var key in events) {

            var match = key.match(delegateEventSplitter);
            var eventName = match[1],
                selector = match[2];

            if (this.needFastClick && eventName.trim().toLowerCase() == "click") {
                var touchEnd = 'touchend',
                    touchStart = 'touchstart';
                if (selector) {
                    touchEnd += ' ' + selector;
                    touchStart += ' ' + selector;
                    this.clickSelectors.push(selector);
                }
                newEvents[touchStart] = this.preventDefault;
                newEvents[touchEnd] = _.bind(this.delegateClick, this);
            }
        }

        if (this.needFastClick) {
            // let custom touchevents override generated events
            this.view.events = _.extend(newEvents, events);
            this.view._fastClickEnabled = true;
        }
    },

    onRender: function() {
        _.each(this.clickSelectors, _.bind(function(selector) {
            this.view.$el.find(selector).addClass(fastClickClass);
        }, this));
    },

    delegateClick: function(e) {
        e.preventDefault();
        // stop if the view has the stop Property set
        if (this.clickStopProperty && this.view[this.clickStopProperty]) {
            // reset property if clearStopProperty is present
            if (this.getOption('clearStopProperty')) {
                this.view[this.clickStopProperty] = false;
            }
            return;
        }
        $(e.currentTarget).trigger('click');
        if (this.getOption('immediateStop')) {
            e.stopImmediatePropagation();
        }
    },

    preventDefault: function(e) {
        e.preventDefault();
    },

    fastClick: function(e) {
        if (this.needFastClick) {
            this.delegateClick(e);
        }
    }
});

module.exports = behavior;