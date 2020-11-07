var _ = require('underscore'),
    content_config = require('_old/controllers/marker_overlays/controllers/content_config'),
    OverlayState = require('_old/controllers/marker_overlays/models/state'),
    collection_factory = require('_old/controllers/marker_overlays/controllers/edit/util/tools_collection_factory');


module.exports = describe('Controllers: Marker Overlays: Edit: Tools Collection Factory', function() {

    var toolscollection,
        overlaystate;

    beforeEach(function() {
        overlaystate = new OverlayState();
        toolscollection = collection_factory.create(overlaystate);
    });

    afterEach(function() {});

    it('should exist', function() {
        expect(toolscollection).to.exist;
    });

    it('should have the right number of entries', function() {
        var tools_unique = _.chain(content_config)
            .map(function(tool) {
                return tool.id;
            })
            .uniq()
            .value();
        expect(toolscollection.length).to.equal(tools_unique.length);
    });

    it('should enable all tools by default', function() {

        // all should be enb
        toolscollection.each(function(item) {
            expect(item.get("disabled")).to.be.false;
        });
    });


    it('should disable exclusive tools if there is at least one block', function() {

        overlaystate.set({
            numberOfBlocks: 5
        });
        // all exclusive items should be disabled if there is at least one block
        toolscollection.each(function(item) {
            if (item.get('exclusive')) {
                expect(item.get("disabled")).to.be.true;
            }
        });
    });

    it('should disable all tools if there is already exclusive content', function() {

        overlaystate.set({
            hasExclusiveContent: true
        });
        // all exclusive items should be disabled if there is at least one block
        toolscollection.each(function(item) {
            expect(true === item.get("disabled")).to.be.true;
        });
    });


});