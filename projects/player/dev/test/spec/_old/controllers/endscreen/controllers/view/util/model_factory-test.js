var Backbone = require('backbone'),
    mwf = require('_old/controllers/endscreen/controllers/util/model_factory'),
    EditStateModel = require('_old/controllers/endscreen/controllers/models/edit_state');


module.exports = describe('Controllers: Endscreen: Util: ModelViewFactory', function() {

    beforeEach(function() {

    });

    it('creates cta model out of video', function() {
        var video = new Backbone.Model({
            endscreen_button_color: 'color',
            endscreen_button_title: 'label',
            endscreen_button_target: 'action'
        });

        var playerState = new Backbone.Model({
            window_width: 1000
        });

        var mv = mwf.createCTA(video, playerState);

        expect(mv.attributes).to.deep.equal({
            color: 'color',
            label: 'label',
            action: 'action',
            window_width: 1000,
            large: true
        });
    });

    describe('create', function() {
        it('forwards enscreen_url, subtitle, background_color values', function() {
            var video = new Backbone.Model({
                endscreen_url: 'url',
                endscreen_subtitle: 'subtitle',
                endscreen_background_color: 'bg_color'
            });

            var mv = mwf.create(video);

            expect(mv.attributes).to.have.property('endscreen_url', 'url');
            expect(mv.attributes).to.have.property('subtitle', 'subtitle');
            expect(mv.attributes).to.have.property('background_color', 'bg_color');
        });

        it('sets title by endscreen_title or title', function() {
            var video = new Backbone.Model({
                endscreen_title: 'ends_title',
                title: 'v_title',
            });
            var mv = mwf.create(video);
            expect(mv.attributes).to.have.property('title', 'ends_title');
            video.set('endscreen_title', '');
            expect(mv.attributes).to.have.property('title', 'v_title');
        });

        xit('creates logo_url from client_id', function() {
            var video = new Backbone.Model({
                apperance_endscreen_logo: 'client123',
            });
            var mv = mwf.create(video);
            expect(mv.get('logo_url')).to.match(/client123/);
            expect(mv.get('logo_url')).to.match(/videopath\.com/);
            expect(mv.get('logo_url')).to.match(/endscreen_logo\.png/);
        });

        it('decides on cta visibility by button title and target', function() {
            var video = new Backbone.Model({
                endscreen_button_title: 'title',
                endscreen_button_target: 'target'
            });

            var mv = mwf.create(video);
            expect(mv.get('display_cta')).to.be.ok;

            video.set('endscreen_button_title', '');
            expect(mv.get('display_cta')).to.not.be.ok;
        });

        it('set the previewSwitchButton label according to editstate', function() {
            var editState = new EditStateModel();
            var mv = mwf.create(new Backbone.Model(), editState);
            /*
            editState.set('state', editState.states.EDIT);
            expect(mv.get('switchButton')).to.equal(editState.states.PREVIEW);
            editState.set('state', editState.states.PREVIEW);
            expect(mv.get('switchButton')).to.equal(editState.states.EDIT);
            */
        });

        it('bind appearence_sharing of playerState', function() {
            /*
            var playerState = new Backbone.Model({});
            var video = new Backbone.Model({
                ui_disable_share_buttons: 'fofo'
            });
            var mv = mwf.create(new Backbone.Model(), video, playerState);

            expect(mv.get('hide_share_buttons')).to.equal('fofo');*/
        });
    });
});