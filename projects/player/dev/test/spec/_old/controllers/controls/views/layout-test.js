var EF = require('helpers/environment_factory'),
    viewModelFactory = require('_old/controllers/controls/util/view_model_factory'),
    Layout = require('_old/controllers/controls/views/layout');

require('behaviors');


module.exports = describe('Controllers: Player: Views: Layout', function() {

    var root;
    var model = viewModelFactory.create(EF.playerState());

    beforeEach(function() {
        root = EF.rootRegion();
    });

    it('should be showable', function() {
        var layout = new Layout({
            model: model
        });
        root.show(layout);
        layout.runSelfTest();
    });

    it('should have regions', function() {
        var layout = new Layout({
            model: model
        });
        root.show(layout);
        expect(layout.playbar).to.exist;
        expect(layout.large_buttons).to.exist;
        expect(layout.small_buttons).to.exist;
    });

});