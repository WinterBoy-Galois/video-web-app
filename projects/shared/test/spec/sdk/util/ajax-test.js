var env = require('../env'),
    ajax = require('sdk/util/ajax');

var response = {
    detail: 'ok'
};

var params = {
    url: 'some_url'
};

describe('SDK: Utils: Ajax', function() {

    it("exists", function() {
        expect(ajax).to.exist;
    });

    it("can run get command", function(done) {

        env.server.fakeResponse(function() {
            ajax.get(params).then(function() {
                done();
            });
        }, 'GET', false, response);

    });

    it("can run post command", function(done) {

        env.server.fakeResponse(function() {
            ajax.post(params).then(function() {
                done();
            });
        }, 'POST', false, response);

    });

    it("can run put command", function(done) {

        env.server.fakeResponse(function() {
            ajax.put(params).then(function() {
                done();
            });
        }, 'PUT', false, response);

    });

    it("can run delete command", function(done) {

        env.server.fakeResponse(function() {
            ajax.del(params).then(function() {
                done();
            });
        }, 'DELETE', false, response);

    });

    it("inserts default detail reason on fail", function(done) {

        env.server.fakeResponse(function() {
            ajax.del(params).fail(function(result) {
                expect(result.detail).to.exist;
                expect(result.status).to.exist;
                done();
            });
        }, 'DEL', 'other_url', response);

    });


});