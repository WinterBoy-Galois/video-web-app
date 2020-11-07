var _ = require('underscore');

var ops = {
    'Add Marker': require('app/operations/addMarker'),
    'Add Marker Content': require('app/operations/addMarkerContent'),
    'Create Video From Revision': require('app/operations/createVideoFromRevision'),
    'Delete Marker': require('app/operations/deleteMarker'),
    'Delete Marker Content': require('app/operations/deleteMarkerContent'),
    'Delete Video': require('app/operations/deleteVideo'),
    'Duplicate Video': require('app/operations/duplicateVideo'),
    'Edit Video': require('app/operations/editVideo'),
    'Import Demo': require('app/operations/importDemo'),
    'Login': require('app/operations/login'),
    'Preview Video': require('app/operations/previewVideo'),
    'Publish Video': require('app/operations/publishVideo'),
    'Reset Password': require('app/operations/resetPassword'),
    'Revert Video Revision': require('app/operations/revertVideoRevision'),
    'Route': require('app/operations/route'),
    'Share Email': require('app/operations/shareEmail'),
    'Show Share Modal': require('app/operations/showShareModal'),
    'Show Start Video Modal': require('app/operations/showStartVideoModal'),
    'Show Tutorial Modal': require('app/operations/showTutorialModal.jsx'),
    'Show Welcome Modal': require('app/operations/showWelcomeModal.jsx'),
    'Unpublish Video': require('app/operations/unpublishVideo'),
    'Unsubcribe User': require('app/operations/unsubscribeUser'),
};


_.each(ops, function(operation, key) {

    describe('Operations All: ' + key, function() {

        it("exists", function() {
            expect(operation).to.exist;
        });

    });

});
