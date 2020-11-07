/*
 * Test operations system
 */

var $ = require('jquery'),
    operations = require('app/operations');

/*
 * Util
 */
var succeedOperation = function() {
    var dfd = new $.Deferred();
    dfd.resolve();
    return dfd.promise();
};

var failOperation = function() {
    var dfd = new $.Deferred();
    dfd.reject();
    return dfd.promise();
};



describe('Operations: Main', function() {

    beforeEach(function(){
        operations.setModals({
            confirm: succeedOperation,
            alert: succeedOperation
        });
    });

    it("exists", function() {
        expect(operations).to.exist;
    });

    it("can run a successful operation", function(done) {
        var op = operations.wrap(succeedOperation);
        op().then(function(){
            done();
        });
    });

    it("can run a failing operation", function(done) {
        var op = operations.wrap(failOperation);
        op().fail(function(){
            done();
        });
    });

    it("will fail if required feature is not available", function(done) {
        var op = operations.wrap(succeedOperation, {
            requiresFeature: 'something'
        });
        op().fail(done);
    });

    it("will succeed if required feature is available", function(done) {

        operations.context.sdk.currentUser.canUseFeature = function() {
            return true;
        };
        var op = operations.wrap(succeedOperation, {
            requiresFeature: 'something else'
        });
        op().then(done);
    });

    it("will route to destination on success", function(done) {
        var op = operations.wrap(succeedOperation, {
            successRoute: 'page2'
        });
        var spy = sinon.spy(operations.context, "route");
        op().then(function() {
            expect(spy).to.have.been.calledWith("page2");
            operations.context.route.restore();
            done();
        });
    });

    it("will show a toast on success", function(done) {
        var op = operations.wrap(succeedOperation, {
            successToast: 'Yeah!'
        });
        var spy = sinon.spy(operations.context.toasts, "success");
        op().then(function() {
            expect(spy).to.have.been.calledWith("Yeah!");
            operations.context.toasts.success.restore();
            done();
        });
    });

    it("will show a toast on failure", function(done) {
        var op = operations.wrap(failOperation, {
            failureToast: 'Oh No!'
        });
        var spy = sinon.spy(operations.context.toasts, "error");
        op().fail(function() {
            expect(spy).to.have.been.calledWith("Oh No!");
            operations.context.toasts.error.restore();
            done();
        });
    });


});