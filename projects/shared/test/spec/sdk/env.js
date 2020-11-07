/*
 * Server Helpers
 */

function fakeResponse(callback, method, url, body, status) {
    var server = sinon.fakeServer.create({
        autoRespond: true,
        respondImmediately: true
    });

    // defaults
    url = url || /.*/;
    body = body || {};
    body = JSON.stringify(body);
    status = status ||  200;

    // setup response
    server.respondWith(method, url, [status, {}, body]);
    callback();

    var i = 5;
    while (i) {
        server.respond();
        i--;
    }

    // tear down fake server
    server.restore();
}


module.exports = {
    server: {
        fakeResponse: fakeResponse
    },
};