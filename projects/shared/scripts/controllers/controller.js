var _ = require('underscore'),
    Marionette = require('marionette'),
    Radio = require('radio');


module.exports = Marionette.Controller.extend({

    // get the root view either from a class
    // or a factory
    rootView: null,
    rootViewClass: null,

    // name of the radio channel we want to attach this controller to
    channelName: null,
    channel: null,

    // events forwarding from subiiews
    forwardEvents: {},

    // view config
    views: {},

    initialize: function(options) {
        this.options = options;

        // instantiate root view
        if (!!this.rootViewClass) {
            this.rootView = new this.rootViewClass();
        } else if (this.buildRootView) {
            this.rootView = this.buildRootView();
        }

        // listen for show event
        if (this.rootView) {
            this.listenTo(this.rootView, "show", function() {
                this.setupRootEvents();
                this.buildViews();
                if (this.onRootViewShow) {
                    this.onRootViewShow();
                }
            });
        }

        // instantiate channel
        if (this.channelName) {
            this.channel = Radio.channel(this.channelName);
        }

    },


    // listen for certain events on the controller
    setupRootEvents: function() {

        // destroy event
        this.listenTo(this, "destroy", function() {
            if (this.rootView) {
                this.rootView.destroy();
            }
            _.each(this.views, function(view) {
                view.destroy();
            });
        });

    },


    // builds all the subview in the controllers
    // subViews object
    buildViews: function() {
        this._views = {};
        this.buildViewsRecursive(this.views, this.rootView, "");
        this.views = this._views;
    },

    buildViewsRecursive: function(views, layout, namespace) {
        var _this = this;
        _.each(views, function(conf, name) {
            var view = _this.buildSubView(conf, name, layout, namespace);
            _this.buildViewsRecursive(conf.subViews, view, namespace + name + ".");
        });
    },

    buildSubView: function(conf, name, layout, namespace) {

        var view,
            _this = this;

        if (name === "rootView") {
            view = this.rootView;
        } else if (conf.viewClass) {
            view = new conf.viewClass();
        } else {
            view = conf.factory(this);
        }

        // insert into region of root layout
        if (conf.region) {
            layout[conf.region].show(view);
        }

        // attach event forwarding
        if (conf.events) {
            _.each(conf.events, function(action, key) {
                _this.listenTo(view, key, function() {

                    if (typeof action === "string") {
                        // in case of string, just forward to channel
                        var newArgs = Array.prototype.slice.call(arguments, 1);
                        newArgs.unshift(action);
                        _this.channel.trigger.apply(_this.channel, newArgs);
                    } else {
                        // if this is a function, call it
                        action.apply(_this, arguments);
                    }
                });
            });
        }

        if (conf.onShow) {
            conf.onShow(this, view);
        }

        if (namespace) {
            name = namespace + name;
        }

        this.addSubView(name, view);
        return view;
    },

    addSubView: function(name, view) {
        this._views[name] = view;
    },


});