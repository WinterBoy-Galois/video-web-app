var $ = require('jquery'),
    app = require('app');

describe('App: App', function() {

    it("can be started", function() {
        // stub routing 
        $(document.body).html("<div id='vp_app' />");
        app.start();
    });

});