var _ = require('underscore'),
    $ = require('jquery'),
    config = require('config'),
    sdk = require('sdk'),
    Marionette = require('marionette'),
    routing = require('./util/routing'),
    authentication_helper = require('./util/authentication_helper'),
    ReactDom= require('react-dom'),
    React = require('react'),
    Operations = require('./operations');

var ModalService = require('shared/services/modal/service'),
    template = require('./views/template.html'),

    AppComponent = require('./components/app');

//
require('behaviors');
require('./util/marionette_extensions');
require('./util/online_helper');

/*
 *   App modules
 */
var modules = {
    "LoginModule": require('modules/login'),
    "DashboardModule": require('modules/dashboard'),
    "VideosModule": require('modules/videos'),
    "SettingsModule": require('modules/settings'),
    "ProfileModule": require('modules/profile'),
    "TeamsModule": require('modules/teams')
};

// wrap application start in a function to prevent test failures
function start() {

    // setup sdk urls
    sdk.setEndpoint(config.apiURL);
    sdk.setStripePublicKey(config.stripeAPIKey);

    //instantiate the app
    var app = new Marionette.Application();
    Marionette.App = app;

    // register modules
    _.each(modules, function(val, key) {
        app.module(key, val);
    });

    // set init routines
    // and update loader ui
    app.on("start", function() {

        $("#vp_load_progress_inner").css("width", "90%");

         // launch react app
        app.component = ReactDom.render(<AppComponent />, document.getElementById('vp_app'));
        Operations.setModals(app.component.refs.modals);
        app.modals = app.component.refs.modals;

        // check wether we have a valid token save or in url
        authentication_helper.authenticate().always(function() {

            sdk.currentUser.subscription.fetch();

            // some animation
            $("#vp_load_progress_inner").css("width", "100%");
            setTimeout(function() {
                $("#vp_app").css("opacity", "1");
                $("#vp_loader").css("opacity", "0");
            }, 10);

            // start the routing
            routing.start();

        });

        // set up modal service
        ModalService.setModalRegion(app.component.refs.modals_old.region); 
        
    });

    // add stuff to app
    app.route = routing.gotoRoute;

    app.start.apply(app, arguments);
}

/*
 *   Interface to the app environment
 */
module.exports.start = start;
