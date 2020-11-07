/*
 *	Config used on staging server
 */

var _ = require('underscore'),
    config = _.clone(require('./config'));

_.extend(config, {
    stripeAPIKey: 'pk_test_DhJ2yhNxQmTZZ5acNEabgSWg00Dt8r1vlt',
    apiURL: 'https://api-staging.videopath.com/v1/',
    shareBaseURL: '//player-dev.videopath.com/',
    builderURL: '../../player/dist/builder.html',
    previewURL: '../../player/dist/player.html',
    signOutURL: '',
    disableHttps: true
});

module.exports = config;
