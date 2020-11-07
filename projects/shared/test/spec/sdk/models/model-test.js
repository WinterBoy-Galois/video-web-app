var env = require('../env'),
    Model = require('sdk/models/_model');

var model_get = {
    "val1": "1",
    "val2": 2,
    "id": 123,
};

describe('SDK: Models: Model', function() {

    it("exists", function() {
        expect(Model).to.exist;
    });

    it("can be instantiated", function() {
        var m = new Model();
        expect(m).to.exist;
        expect(m.localID).to.exist;
    });

    it("can be fetched", function(done) {
        var m = new Model();
        m.url = 'some_url';
        env.server.fakeResponse(function() {
            m.fetch().then(function() {
                expect(m.get("val1")).to.equal("1");
                expect(m.get("val2")).to.equal(2);
                done();
            });
        }, 'GET', false, model_get);
    });

    it("can be created", function(done) {
        var m = new Model();
        m.url = 'some_url';
        env.server.fakeResponse(function() {
            m.save().then(function() {
                done();
            });
        }, 'POST', false, model_get);
    });

    it("can be updated", function(done) {
        var m = new Model({
            id: 25
        });
        m.url = 'some_url';
        env.server.fakeResponse(function() {
            m.save().then(function() {
                done();
            });
        }, 'PUT', false, model_get);
    });

    it("can be deleted", function(done) {
        var m = new Model({
            id: 25
        });
        m.url = 'some_url';
        env.server.fakeResponse(function() {
            m.destroy().then(function() {
                done();
            });
        }, 'DELETE', false, model_get);
    });

    it("is dirty after attribute change and clean after save", function(done) {
        var m = new Model({});
        m.url = 'some_url';
        expect(m.isDirty()).to.be.false;
        m.set({
            val: 'val'
        });
        expect(m.isDirty()).to.be.true;
        env.server.fakeResponse(function() {
            m.save().then(function() {
                expect(m.isDirty()).to.be.false;
                done();
            });
        });
    });

    it("can created and populate children", function() {

        // create model  with children
        var MyModel = Model.extend({
            children: {
                child1: Model,
                child2: Model
            }
        });

        var m = new MyModel();
        m.set({
            val: 'val',
            child1: {
                val1: 'val1'
            },
            child2: {
                val2: 'val2'
            }
        });

        expect(m.get('val')).to.equal('val');

        expect(m.child1).to.exist;
        expect(m.child1.get('val1')).to.equal('val1');

        expect(m.child2).to.exist;
        expect(m.child2.get('val2')).to.equal('val2');

    });

});