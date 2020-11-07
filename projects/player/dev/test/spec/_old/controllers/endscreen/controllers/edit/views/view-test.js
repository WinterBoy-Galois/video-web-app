var EF = require('helpers/environment_factory'),
    View = require('_old/controllers/endscreen/controllers/edit/views/view');

require('behaviors');


module.exports = describe('Controllers: Endscreen: Edit: View', function() {

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

    it('title should be editable', function() {
        model.set({
            title: "title"
        });
        var trigger = sinon.stub(view, 'trigger');

        expect(view.$('.vp_title_block').hasClass('vp_editing')).to.be.false;
        expect(view.ui.titleContent.text()).to.equal("title");

        view.$('.vp_title_block').click();
        expect(view.$('.vp_title_block').hasClass('vp_editing')).to.be.true;

        view.ui.titleContent.text('new_title');
        view.ui.titleContent.trigger('focusout');
        expect(view.$('.vp_title_block').hasClass('vp_editing')).to.be.false;
        expect(trigger).to.be.calledWith('change_title', 'new_title');
    });

    it('subtitle should be settable and block should be showing', function() {
        expect(view.$(".vp_subtitle_block").hasClass("vp_add_new")).to.be.true;
        model.set({
            subtitle: "subtitle"
        });
        expect(view.$(".vp_subtitle_content").text()).to.equal("subtitle");
        expect(view.$(".vp_subtitle_block").hasClass("vp_add_new")).to.be.false;
    });

    it('subtitle should be editable', function() {
        model.set({
            subtitle: "subtitle"
        });
        var trigger = sinon.stub(view, 'trigger');

        expect(view.$('.vp_subtitle_block').hasClass('vp_editing')).to.be.false;

        view.$('.vp_subtitle_block').click();
        expect(view.$('.vp_subtitle_block').hasClass('vp_editing')).to.be.true;

        view.ui.subtitleContent.text('new_subtitle');
        view.ui.subtitleContent.trigger('focusout');
        expect(view.$('.vp_subtitle_block').hasClass('vp_editing')).to.be.false;
        expect(trigger).to.be.calledWith('change_subtitle', 'new_subtitle');
    });

    it('should set its background color and determine its lightness', function() {
        view.featureColor = true;
        view.render();

        expect(view.$el.hasClass('vp_light_bg')).to.be.false;

        model.set({
            background_color: "#FFFF00"
        });

        expect(view.$el.css("background-color")).to.equal("rgb(255, 255, 0)");
        expect(view.colorChooser.spectrum('get').toHexString()).to.equal("#ffff00");
        expect(view.$el.hasClass('vp_light_bg')).to.be.true;

        model.set({
            background_color: "#0F0F0F"
        });

        expect(view.$el.css("background-color")).to.equal("rgb(15, 15, 15)");
        expect(view.colorChooser.spectrum('get').toHexString()).to.equal("#0f0f0f");
        expect(view.$el.hasClass('vp_light_bg')).to.be.false;
    });

    it('should show logo', function() {
        expect(view.$(".vp_custom_logo").hasClass("vp_removed")).to.be.true;
        model.set({
            logo_url: "some_url"
        });
        expect(view.$(".vp_custom_logo").attr("src")).to.equal("some_url");
        expect(view.$(".vp_custom_logo").hasClass("vp_removed")).to.be.false;
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