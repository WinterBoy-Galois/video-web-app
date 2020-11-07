var env = require('../env'),
    Collection = require('sdk/models/markers');

var data = [{
    id: 1,
    time: 30,
    title: 'marker1'
}, {
    id: 2,
    time: 20,
    title: 'marker2'
}, {
    id: 3,
    time: 10,
    title: 'marker3'
}, ];

describe('SDK: Models: Markers', function() {

    it("exists", function() {
        expect(Collection).to.exist;
    });

    it("can be instantiated", function() {
        var c = new Collection();
        expect(c).to.exist;
    });

    it("will sort markers on set", function() {
        var c = new Collection(data);
        expect(c.models[0].get('title')).to.equal('marker3');
    });

    it("will create child in correct order", function(done) {
        var c = new Collection(data);
        env.server.fakeResponse(function() {
            c.create({
                time: 15,
                title: 'marker4'
            }).then(function(child) {
                expect(child).to.exist;
                expect(c.models[1].localID).to.equal(child.localID);
                done();
            });
        });
    });

    it("can return next marker after given time", function() {
        var c = new Collection(data);
        expect(c.nextBeforeTime(5).get('title')).to.equal('marker3');
        expect(c.nextBeforeTime(11).get('title')).to.equal('marker3');
        expect(c.nextBeforeTime(40).get('title')).to.equal('marker1');
    });

    it("can return next marker after given time with cutoff", function() {
        var c = new Collection(data);
        expect(c.nearestToTime(5, 3)).to.not.exist;
        expect(c.nearestToTime(11, 3).get('title')).to.equal('marker3');
        expect(c.nearestToTime(15, 3)).to.not.exist;
    });

    it("can return next child", function() {
        var c = new Collection(data);
        expect(c.next(3).get('id')).to.equal(2);
        expect(c.next(2).get('id')).to.equal(1);

    });


});