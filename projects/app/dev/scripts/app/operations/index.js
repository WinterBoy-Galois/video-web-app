var s = require('strings')('ops'),
    _ = require('underscore'),
    $ = require('jquery'),
    sdk = require('sdk'),
    Marionette = require('marionette'),
    toasts = require('app/ui/toasts'),
    analytics = require('analytics');


/*
 *  Defaults
 */
var defaults = {

    // page to track in GA if this operation is started
    startTrackPage: false,

    // set to feature if required
    requiresFeature: false,
    accessScope: false, // can be a user or a team
    featureName: "This Feature",
    featureDescription: '',
    planLevel: "pro", // can be pro, enterprise or individual

    // success behavior
    successToast: false,
    successTrackPage: false,
    successRoute: false,

    // failure behavior
    failureToast: false,
    failureTrackPage: false,
    failureRoute: false
};

var upgrade_modals = {
    'pro': 'upgrade_modal_pro',
    'enterprise': 'upgrade_modal_enterprise',
    'individual': 'upgrade_modal_individual',
};


/*
 *	 Check if the user is on the right plan for this feature
 *   If not, show the upgrade modal 
 */
function checkFeature(config) {
    var dfd = new $.Deferred();

    if (!config.accessScope) {
        config.accessScope = sdk.currentUser;
    }

    if (!config.requiresFeature ||  config.accessScope.canUseFeature(config.requiresFeature)) {
        dfd.resolve();
    } else {
        context.modals.confirm(s(upgrade_modals[config.planLevel], config.featureName, config.featureDescription)).then(function() {
            if ( config.planLevel == 'pro' ) {
                context.route('settings/plans');
            } else {
                 window.location.href = 'mailto:sales@videopath.com';
            }
        }).always(dfd.reject);
    }
    return dfd.promise();
}

/*
 *  Helpers
 */
function resolve() {
    var dfd = new $.Deferred();
    dfd.resolve();
    return dfd.promise();
}

function reject() {
    var dfd = new $.Deferred();
    dfd.reject();
    return dfd.promise();
}

function route(r) {
    Marionette.App.route(r);
}

/*
 *  Context object for operations
 */
var context = {
    sdk: sdk,
    toasts: toasts,
    analytics: analytics,
    resolve: resolve,
    reject: reject,
    route: route
};

function checkConfiguration(config) {
    _.each(config, function(value, key) {
        if (defaults[key] === undefined) {
            throw new Error("Unknown operation setting: " + key);
        }
    });
}

/*
 * Main wrapper function to wrap and secure all ops
 */
function wrap(run, operationConfig) {

    // default configs
    operationConfig = operationConfig ||  {};
    checkConfiguration(operationConfig);


    /*
     *  Construct and return the final callable
     */
    var runnable = function(options, config) {

        checkConfiguration(config);


        // construct config
        config = config ||  {};
        _.defaults(config, operationConfig, defaults);

        options = options ||  {};

        /*
         *  On success show a toast or track pages, depending on the conf
         */
        function success(arg) {
            if (config.successToast) {
                toasts.remove();
                toasts.success(config.successToast);
            }
            if (config.successTrackPage) {
                context.analytics.trackPage(config.successTrackPage);
            }
            if (config.successRoute) {
                context.route(config.successRoute);
            }
            return arg;
        }

        /*
         *  Try to handle failures gracefully
         */
        function failure(result) {

            // if there is a result and the status is zero, let the user know the api is unavailable
            if (result && result.status === 0) {
                toasts.remove();
                toasts.error('Could not connect to API. Are you online? Please try again.');
            } 
            
            // if there is a predefined failure toast, show the toast
            else if (config.failureToast) {
                toasts.remove();
                toasts.error(config.failureToast, 'Error');
            }

            // if there is a tracking point for failure, track it
            if (config.failureTrackPage) {
                analytics.trackPage(config.failureTrackPage);
            }

            if (config.failureRoute) {
                route(config.failureRoute);
            }

            return result;
        }


        if (config.startTrackPage) {
            analytics.trackPage(config.startTrackPage);
        }

        /*
         *  Execute!
         */
        return checkFeature(config).then(function() {
            return run(context, options, config).then(success, failure);
        });
    };

    runnable.config = operationConfig;

    return runnable;

}

function setModals(modals) {
    context.modals = modals;
}

module.exports = {
    setModals:setModals,
    wrap: wrap,
    context: context,
    defaults: defaults
};