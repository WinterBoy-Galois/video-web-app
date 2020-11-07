/*
 *   Test all models for standard behavior
 */

var _ = require('underscore');

var models = {

    // video
    'video': require('sdk/models/video'),
    'video_revision': require('sdk/models/video_revision'),
    'marker': require('sdk/models/marker'),
    'marker_content': require('sdk/models/marker_content'),
    'analytics_data': require('sdk/models/analytics_data'),

    // user
    'user': require('sdk/models/user'),
    'user_address': require('sdk/models/user_address'),
    'user_creditcard': require('sdk/models/user_creditcard'),
    'user_subscription': require('sdk/models/user_subscription'),

    // billing & plans
    'plan': require('sdk/models/plan'),
    'invoice': require('sdk/models/invoice'),

    // integrations
    'integration': require('sdk/models/integration')

};


describe('SDK: Models: All Models', function() {

    _.forEach(models, function(Model, name) {

        it(name + ' exists', function() {
            expect(Model).to.exist;
        });

        it(name + ' can be instantiated', function() {
            var m = new Model();
            expect(m).to.exist;
        });

        it(name + ' can be set', function() {
            var data = {
                id: 1
            };
            var m = new Model(data);
            expect(m.get('id')).to.equal(1);
        });

    });


});