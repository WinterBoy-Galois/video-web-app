var env = require('../env'),
    Collection = require('sdk/models/marker_contents'),
    ChildModel = require('sdk/models/marker_content');

describe('SDK: Models: MarkerContents', function() {

    it("exists", function() {
        expect(Collection).to.exist;
    });

    it("can be instantiated", function() {
        var c = new Collection();
        expect(c).to.exist;
    });

    it("can create new children and sort them correctly", function(done) {

        // create collection with existing children
        var c = new Collection();
        c.add(new ChildModel({
            ordinal: 0
        }));
        c.add(new ChildModel({
            ordinal: 1
        }));
        c.add(new ChildModel({
            ordinal: 2
        }));

        env.server.fakeResponse(function() {
            c.create({
                title: 'some_title'
            }, {
                index: 1
            }).then(function(child) {
                expect(child).to.exist;
                expect(c.models[1].localID).to.equal(child.localID);
                done();
            });
        });

    });

});