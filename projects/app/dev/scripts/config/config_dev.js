/*
 *	Config used on staging server
 */

var _ = require('underscore'),
    config = _.clone(require('./config'));

_.extend(config, {
    stripeAPIKey: 'pk_test_DhJ2yhNxQmTZZ5acNEabgSWg00Dt8r1vlt',
    apiURL: 'https://api-staging.videopath.com/v1/',
    shareBaseURL: '//player-dev.videopath.com/',
    signOutURL: ''
});

module.exports = config;
