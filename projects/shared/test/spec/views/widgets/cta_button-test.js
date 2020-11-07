define([
    'backbone',
    'widgets/cta_button/view',
    'shared/views/behaviors/behaviors'
], function(Backbone, CTAButtonWidget) {

    describe('CTAButtonWidget', function() {

        it('exists', function () {
            expect(new CTAButtonWidget()).to.exist;
        });

        it('becomes large if the large attribute is set', function () {
            var btn = new CTAButtonWidget({
                model: new Backbone.Model({
                    large: true
                })
            }).render();
            expect(btn.$el.hasClass('vp_cta_large')).to.be.true;
        });

        it('change recognizes light background colors', function () {
            var btn1 = new CTAButtonWidget({
                model: new Backbone.Model({
                    color: 'black'
                })
            }).render();
            var btn2 = new CTAButtonWidget({
                model: new Backbone.Model({
                    color: 'white'
                })
            }).render();
            expect(btn1.$el.hasClass('vp_light_bg')).to.be.false;
            expect(btn2.$el.hasClass('vp_light_bg')).to.be.true;
        });

        it('opens windows on click', function () {
            sinon.stub(window, 'open');
            var btn = new CTAButtonWidget({
                model: new Backbone.Model({
                    action: 'videopath.com'
                })
            }).render().$el.click();
            expect(window.open).to.be.called;
            expect(window.open.args[0][0]).to.match(/videopath.com/);
        });

        it('should set text and color in main div', function() {
            var btn = new CTAButtonWidget({
                model: new Backbone.Model({
                    label: "some title",
                    color: "#ff0000"
                })
            }).render();
            expect(btn.$el.text()).to.equal("some title");
            expect(btn.$el.css("background-color")).to.equal("rgb(255, 0, 0)");
        });
    });
});
