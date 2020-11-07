define([
    'backbone',
    'marionette',
    'behaviors'
], function(Backbone, Marionette) {

    describe('Stickit Behavior', function() {

        var view;

        beforeEach(function() {
            var vclass = Marionette.ItemView.extend({
                template: "<div> </div>",
                behaviors: {
                    Stickit: {}
                }
            });
            view = new vclass({
                model: new Backbone.Model()
            });
        });

        afterEach(function() {
            view.destroy();
        });


        it('exists', function() {
            expect(view).to.exist;
        });

        it('should stick on render', function() {
            sinon.spy(view, "stickit");
            view.render();
            expect(view.stickit).to.have.been.called
        });

        it('should unstick on destroy', function() {
            sinon.spy(view, "unstickit");
            view.destroy();
            expect(view.unstickit).to.have.been.called
        });

        
    });
});