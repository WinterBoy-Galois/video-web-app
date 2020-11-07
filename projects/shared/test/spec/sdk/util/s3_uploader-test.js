var env = require('../env'),
    s3_uploader = require('sdk/util/s3_uploader');


var response = {
    ticket_id: '12345',
    endpoint: 'some_url'
};

describe('SDK: Utils: S3 Uploader', function() {

    it("exists", function() {
        expect(s3_uploader).to.exist;
    });

    it("it will make a basic run", function(done) {

        env.server.fakeResponse(function() {
            s3_uploader.uploadFile("something", "url1", "url2").then(function() {
                done();
            });
        }, false, false, response, 200);


    });

});