var config = require('config'),
    $ = require('jquery'),
    _ = require('underscore'),
    Backbone = require('backbone'),
    Marionette = require('marionette'),
    sdk = require('sdk');


// this will be set to true if the page is
// currently forwarding, to prevent any
// subsequent location updated
var forwarding = false;

// default routes if no arguments
// are given
var defaultRoutes = {
    loggedOut: "login",
    loggedIn: "dashboard"
};

// list of routes which are acceptable for users
// that are not signed in
var loggedOutRoutes = [
    "login",
    "signup",
    "signup_embed",
    "unsupported",
    "forgot_pw",
    "maintenance"
];

// list of urls which are allowed to run on http
// all the rest will be redirected to https
var unsafeURLs = [
    "forward",
    "dashboard",
    "video",
    "integrations",
    "project",
    "create-project"
];

// urls which should not stay in the history
var noHistoryURLs = [
    "signup",
    "login",
    "forward"
];

function urlForRoute(protocol, route) {
    var baseDir = window.location.pathname.split('/');
    baseDir = baseDir.join("/");
    return protocol + "://" + window.location.host + baseDir + "#" + route;
}

function routeInList(route, list) {
    return !!_.find(list, function(s) {
        return route.indexOf(s) === 0;
    });
}

// execute routing request
function gotoRoute(route, options) {

    // if we're currently forwarding,
    // do not execute this routing event
    if (forwarding) {
        return false;
    }

    // jump out of routing if new window is set
    if (options && options.newWindow) {
        var url = urlForRoute(route);
        window.open(url, '_blank');
        return false;
    }

    // if the user is not logged in route him to the default
    // route if he is not on an acceptable page
    else if (!sdk.currentUser.isLoggedIn() && !routeInList(route, loggedOutRoutes)) {
        route = defaultRoutes.loggedOut+'?next='+route;
    } else if (sdk.currentUser.isLoggedIn() && route === "") {
        route = defaultRoutes.loggedIn;
    }

    // check wether we need to forward
    // the route to a different protocol
    if (!checkProtocol(route)) {
        return false;
    }

    // fire routing event
    options = options ||  {};
    options.trigger = true;
    options.replace = routeInList(String(window.location.hash.replace("#", "")), noHistoryURLs);

    var r = new Marionette.AppRouter();
    r.navigate(route, options);
    return true;
}

// this patches and intercepts the backbone router
// so we can foward to the correct protocol if need be
function patchBackbone() {
    Backbone.history.checkUrl = function() {
        var current = this.getFragment();
        if (current === this.fragment && this.iframe) {
            current = this.getFragment(this.getHash(this.iframe));
        }
        if (current === this.fragment) return false;
        if (!checkProtocol(current)) return false; // this is the injected line!
        if (this.iframe) this.navigate(current);
        this.loadUrl();
    }.bind(Backbone.history);
}

// check if the routes protocol
// is in order, if not, forward
// to correct page
function checkProtocol(route) {

    route = String(route);

    if (forwarding) return false;

    // always ok when https is disabled via config
    if (config.disableHttps) return true;

    // detect wether the current route
    // would require https
    var https = !routeInList(route, unsafeURLs);

    // determine if a protocol needs to be forced
    var forcedProtocol;
    if (https && window.location.protocol !== "https:") {
        forcedProtocol = "https";
    }
    if (!https && window.location.protocol !== "http:") {
        forcedProtocol = "http";
    }

    // if we are forcing a protocol
    // set the new location on the window
    if (forcedProtocol) {

        // animate main content out
        // a bit hackish here
        $("#vp_app").css("opacity", "0");

        var newurl;

        // in case there is a forward token, use it
        var token = sdk.users.getOTToken();
        if (forcedProtocol === "http" && token) {
            newurl = urlForRoute(forcedProtocol, "token/" + token + '?next='+route);
        } else {
            newurl = urlForRoute(forcedProtocol, route);
            forwarding = true;
        }

        // update the location object on the window
        if (routeInList(String(window.location.hash.replace("#", "")), noHistoryURLs)) {
            window.location.replace(newurl);
        } else {
            window.location = newurl;
        }

        return false;
    }

    return true;

}

/*
 * Public functions
 */
function startRouting() {

    // patch backbone router
    patchBackbone();

    // get the current route
    var route = String(window.location.hash.replace("#", ""));

    Backbone.history.start();
    gotoRoute(route);
}


module.exports = {
    start: startRouting,
    gotoRoute: gotoRoute,
};
