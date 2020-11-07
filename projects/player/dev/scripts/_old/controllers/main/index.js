var _ = require('underscore'),
    config = require('config'),
    strings = require('config/strings'),
    Marionette = require('marionette'),
    Radio = require('radio'),
    browser_support_helper = require('shared/util/browser_support_helpers'),
    ControlsController = require('_old/controllers/controls/controller'),
    MarkerOverlaysController = require('_old/controllers/marker_overlays/controller'),
    EndscreenController = require('_old/controllers/endscreen/controller'),
    MarkersController = require('_old/controllers/markers/controller'),
    SupportController = require('_old/controllers/support/controller'),
    FullscreenController = require('_old/controllers/other/fullscreen/controller'),
    StyleController = require('_old/controllers/other/style/controller'),
    APIController = require('_old/controllers/other/api/controller'),
    KeyboardEventsController = require('_old/controllers/other/keyboard_events/controller'),
    BootstrapController = require('_old/controllers/other/bootstrap/controller'),
    PlayerJSController = require('_old/controllers/other/playerjs/controller'),
    TrackingPixelController = require('_old/controllers/other/tracking_pixels/controller'),
    UnrulyController = require('_old/controllers/other/unruly/controller'),
    Layout = require('./views/layout');


module.exports = Marionette.Controller.extend({

    initialize: function(options) {

        this.player = options.player;
        this.engine = options.engine;
        this.controllers = {};

        // load root layout
        this.rootView = new Layout();

        var _this = this;
        this.listenTo(this.rootView, "show", function() {
            _this.setup();
        });

    },

    setup: function() {

        // setup base stuff

        // if browser is not supported at all..
        if (!browser_support_helper.browserSupported) {
            this.setupSupportControllers();
            return;
        }

        // set mobile platform if this is the case
        if (browser_support_helper.mobile) {
            this.rootView.$el.addClass("vp_mobile");
        }

        // ios safari 7.1 grey bar bug
        window.onorientationchange = function() {
            window.scrollTo(0, 0);
        };

        // show video player
        if ( this.engine.rootView) {
            this.rootView.video_engine.show(this.engine.rootView);
        } else if (this.engine.start) {
            this.engine.start();
        }

        // setup rest
        this.loadStrings();
        this.setupControllers();
        this.setupControlsCollapsing();
        this.setupOverlayMarkersCommunication();

        // needed for PlayerResize behavior
        this.listenTo(this.player.playerState, 'change:window_size', function() {
            Radio.channel(config.channels.gui).trigger('resize');
        });
    },

    // exectuted if the current browser is not supported
    setupSupportControllers: function() {
        this.addController(SupportController, "supportController", "support");
    },

    setupControllers: function() {

        this.addController(FullscreenController, "fullscreenController");
        this.addController(StyleController, "styleController");
        this.addController(APIController, "apiController");

        // layer of controls, includes sidebar and buttons
        this.addController(ControlsController, "controlsController", "controls");

        // handles the overlay contents which is displayed when a marker is clicked
        // both edit and view instances
        this.addController(MarkerOverlaysController, "markerOverlaysController", "marker_overlays");

        // handles the endscreen, both edit and view instances
        this.addController(EndscreenController, "endscreenController", "end_screen");

        // handles all the markers
        this.addController(MarkersController, "markersController", "markers");

        // support controller
        // will display messages to users on unsupported devices
        this.addController(SupportController, "supportController", "support");

        this.addController(KeyboardEventsController, "keyboardController");
        this.addController(BootstrapController, "BootstrapController");
        this.addController(PlayerJSController, "playerJSController");
        this.addController(TrackingPixelController, "trackingPixelController");
        this.addController(UnrulyController, "unrulyController");

    },

    addController: function(CClass, propertyName, region) {
        var controller = new CClass(this.player);
        this.controllers[propertyName] = controller;

        if (region) {
            this.rootView[region].show(controller.rootView);
        }
    },

    loadStrings: function() {
        var video = this.player.video;

        // load language, should be moved into own controller later
        if (video.get("ui_language") === "de") {
            strings.loadLanguage("de");
        }

    },

    setupControlsCollapsing: function() {

        var api = this.player.api,
            lastActionXPos = -1,
            lastActionTime = Date.now();


        var sendInteraction = _.throttle(function(newXPos) {
            api.command("show_controls");
            lastActionXPos = newXPos;
            lastActionTime = Date.now();
        }, 60, {
            leading: false
        });

        var idleTimeout = function() {
            // don't collapse controls if mouse is hovering over sidebar
            if (lastActionXPos < 0 ||
                lastActionXPos > 200 ||  !lastActionXPos) {
                api.command('collapse_controls');
            }
        };

        this.listenTo(this.rootView, "interact", sendInteraction);

        setInterval(function() {
            if ((Date.now() - lastActionTime) > 3000) {
                idleTimeout();
            }
        }, 1000);

    },

    setupOverlayMarkersCommunication: function() {

        // transfer click position from overlay background to markers controller
        this.listenTo(this.controllers.markerOverlaysController, 'background_clicked', function(clickPosition) {
            setTimeout(function() {
                this.controllers.markersController.checkMarkerClick(clickPosition);
            }.bind(this), 250);
        });
    }
});