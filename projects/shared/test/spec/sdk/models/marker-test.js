var Model = require('sdk/models/marker');

describe('SDK: Models: Marker', function() {

    it("exists", function() {
        expect(Model).to.exist;
    });

    it("can be instantiated", function() {
        var m = new Model();
        expect(m).to.exist;
    });

    it("can be populated", function() {
        var data = {
            time: 200,
            contents: [{
                title: 'content1',
                ordinal: 0
            }, {
                title: 'content2',
                ordinal: 1
            }]
        };
        var m = new Model(data);
        expect(m.get('time')).to.equal(200);
        expect(m.contents.models[0].get('title')).to.equal('content1');
        expect(m.contents.models[1].get('title')).to.equal('content2');
    });

});