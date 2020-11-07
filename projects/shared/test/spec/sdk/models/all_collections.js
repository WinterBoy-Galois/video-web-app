/*
 *   Test all collections for standard behavior
 */

var _ = require('underscore');

var collections = {

    // video
    'video': require('sdk/models/videos'),
    'markers': require('sdk/models/markers'),
    'marker_contents': require('sdk/models/marker_contents'),
    'analytics_datas': require('sdk/models/analytics_datas'),

    // billing & plans
    'plan': require('sdk/models/plans'),
    'invoice': require('sdk/models/invoices'),
    'video_revisions': require('sdk/models/video_revisions'),
    'integrations': require('sdk/models/integrations')

};


describe('SDK: Models: All Models', function() {

    _.forEach(collections, function(Collection, name) {

        it('exists', function() {
            expect(Collection).to.exist;
        });

        it(name + ' can be instantiated', function() {
            var c = new Collection();
            expect(c).to.exist;
        });

        it(name + ' can be set', function() {

            var data = {
                result: [{
                    val: 'child1'
                }, {
                    val: 'child2'
                }, {
                    val: 'child3'
                }]
            };

            var c = new Collection(data);
            expect(c.models[0].get('val')).to.equal('child1');
            expect(c.models[1].get('val')).to.equal('child2');
            expect(c.models[2].get('val')).to.equal('child3');

        });

    });

});