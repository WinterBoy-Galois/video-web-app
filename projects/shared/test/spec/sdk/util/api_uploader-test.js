var env = require('../env'),
    api_uploader = require('sdk/util/api_uploader');

describe('SDK: Utils: API Uploader', function() {

    it("exists", function() {
        expect(api_uploader).to.exist;
    });

    it("can make put request", function(done) {
        env.server.fakeResponse(function() {
            api_uploader.uploadFile('some_url', 'some_file', {}).then(function() {
                done();
            });
        }, "PUT", false, {});
    });

    it("can make delete request", function(done) {
        env.server.fakeResponse(function() {
            api_uploader.deleteFile('some_url').then(function() {
                done();
            });
        }, "DELETE", false, {});
    });

});