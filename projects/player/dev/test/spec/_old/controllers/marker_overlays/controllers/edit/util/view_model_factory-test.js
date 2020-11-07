var OverlayState = require('_old/controllers/marker_overlays/models/state'),
    model_factory = require('_old/controllers/marker_overlays/controllers/edit/util/view_model_factory');


module.exports = describe('Controllers: Marker Overlays: Edit: View Model Factory', function() {

    var viewmodel,
        overlaystate;

    beforeEach(function() {
        overlaystate = new OverlayState();
        viewmodel = model_factory.create(overlaystate);
    });

    afterEach(function() {});

    it('should exist', function() {
        expect(viewmodel).to.exist;
    });

    it('should have active toolbar only in edit mode', function() {
        expect(viewmodel.get("toolbar_active")).to.be.falsy;
        overlaystate.set({
            state: overlaystate.states.EDIT
        });
        expect(viewmodel.get("toolbar_active")).to.be.truthy;
    });

    it('should have the right preview button title', function() {
        overlaystate.set({
            state: overlaystate.states.PREVIEW
        });
        expect(viewmodel.get("preview_button_title")).to.equal("Edit");
        overlaystate.set({
            state: overlaystate.states.EDIT
        });
        expect(viewmodel.get("preview_button_title")).to.equal("Preview");
    });

});