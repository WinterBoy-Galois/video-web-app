var EF = require('helpers/environment_factory'),
    View = require('_old/controllers/endscreen/controllers/view/views/view');

require('behaviors');


module.exports = describe('Controllers: Endscreen: Views: View', function() {

    var root, model, view;

    beforeEach(function() {
        root = EF.rootRegion();
        model = EF.emptyModel();
        view = new View({
            model: model
        });
        root.show(view);
    });

    afterEach(function() {
        model.clear();
        view.destroy();
    });

    it('should be showable', function() {
        expect(view.$el).to.exist;
        view.runSelfTest();
    });

    it('title should be settable', function() {
        model.set({
            title: "title"
        });
        expect(view.$(".vp_title_content").text()).to.equal("title");
    });

    it('subtitle should be settable and block should be showing', function() {
        expect(view.$(".vp_subtitle_block").hasClass("vp_removed")).to.be.true;
        model.set({
            subtitle: "subtitle"
        });
        expect(view.$(".vp_subtitle_content").text()).to.equal("subtitle");
        expect(view.$(".vp_subtitle_block").hasClass("vp_removed")).to.be.false
    });

    it('should set its background color and determine its lightness', function() {
        expect(view.$el.hasClass('vp_light_bg')).to.be.false;
        model.set({
            background_color: "#FFFF00"
        });
        expect(view.$el.css("background-color")).to.equal("rgb(255, 255, 0)");
        expect(view.$el.hasClass('vp_light_bg')).to.be.true;
        model.set({
            background_color: "#0F0F0F"
        });
        expect(view.$el.css("background-color")).to.equal("rgb(15, 15, 15)");
        expect(view.$el.hasClass('vp_light_bg')).to.be.false;
    });

    it('should show logo', function() {
        expect(view.$(".vp_custom_logo").hasClass("vp_removed")).to.be.true
        model.set({
            logo_url: "some_url"
        });
        expect(view.$(".vp_custom_logo").attr("src")).to.equal("some_url");
        expect(view.$(".vp_custom_logo").hasClass("vp_removed")).to.be.false
    });

    it('should have regions for cta and share buttons widgets', function() {
        expect(view.shareButtons).to.exist;
        expect(view.actionButton).to.exist;
    });

    it('should remove the sharebuttons if set', function() {
        expect(view.$(".vp_share_block").hasClass("vp_removed")).to.be.false;
        model.set({
            hide_share_buttons: true
        });
        expect(view.$(".vp_share_block").hasClass("vp_removed")).to.be.true;
    });

    it('change to static view on small screens', function() {
        expect(view.$el.hasClass("vp_static")).to.be.false;

        sinon.stub(view.ui.footerBlock, 'outerHeight').returns(100);
        sinon.stub(view.ui.centerArea, 'outerHeight').returns(100);
        window.innerHeight = 150;

        view.onPlayerResize();
        expect(view.$el.hasClass("vp_static")).to.be.true;

        window.innerHeight = 350;
        view.onPlayerResize();
        expect(view.$el.hasClass("vp_static")).to.be.false;
    });

    it('should show centerarea after resizing', function() {
        view = new View({
            model: model
        }).render();
        expect(view.$(".vp_center_area").hasClass("vp_hidden")).to.be.true;
        view.onPlayerResize();
        expect(view.$(".vp_center_area").hasClass("vp_hidden")).to.be.false;
    });
});