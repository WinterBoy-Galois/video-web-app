//setup shortcuts
require.config({
    "urlArgs": "version=" + (new Date()).getTime(),
    paths: {
        tpl: "../templates",
        widgets: 'views/widgets',
        shared: '.',
        behaviors: 'views/behaviors/behaviors',
        // Bower libs
        text: '../../../bower_modules/requirejs-text/text',
        jquery: '../../../bower_modules/jquery/dist/jquery',
        jquery_ui: '../../../bower_modules/jquery-ui/jquery-ui',
        underscore: '../../../bower_modules/underscore/underscore',
        backbone: '../../../bower_modules/backbone/backbone',
        mustache: '../../../bower_modules/mustache/mustache',
        modernizr: '../../../bower_modules/modernizr/modernizr',
        tooltipster: '../../../bower_modules/tooltipster/js/jquery.tooltipster',
        spectrum: '../../../bower_modules/spectrum/spectrum',
        tinycolor: '../../../bower_modules/tinycolor/tinycolor',
        marionette: '../../../bower_modules/marionette/lib/backbone.marionette',
        radio: '../../../bower_modules/backbone.radio/src/backbone.radio',
        stickit: '../../../bower_modules/backbone.stickit/backbone.stickit',
        babysitter: '../../../bower_modules/backbone.babysitter/lib/backbone.babysitter',

        // Custom libs
        frogaloop: '../../../custom_modules/frogaloop/frogaloop.min',
        ga: '../../../custom_modules/analytics/analytics',
        jqstorage: '../../../custom_modules/jQuery-Storage-API/jquery.storageapi', // using custom implementation
    },
    shim: {
        'underscore': {
            exports: '_'
        },
        'modernizr': {
            exports: 'Modernizr'
        },
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'frogaloop': {
            exports: '$f'
        },
        "ga": {
            exports: "ga"
        },
        'spectrum': {
            deps: ['jquery'],
        },
        'marionette': {
            deps: ['jquery', 'underscore', 'backbone'],
            exports: 'Marionette'
        },
        'babysitter': {
            deps: ["backbone"]
        },
        'radio': {
            deps: ['backbone'],
            exports: 'Backbone.Radio',
        }
    }
});

//start app
require([
    'style_guide_app'
], function(App) {
    App.initialize();
});