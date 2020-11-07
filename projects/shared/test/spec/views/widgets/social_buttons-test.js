define([
    'widgets/social_buttons/view'
], function(SocialButtonsWidget) {

    describe('SocialButtonsWidget', function() {

        it('has as 6 default buttons', function () {
            var view = new SocialButtonsWidget().render();
            expect(view.$el.children().length).to.equal(6);
        });

        it('triggers share events on button clicks', function () {
            var view = new SocialButtonsWidget().render();
            var handler = sinon.stub();
            view.on('share_clicked', handler);

            view.$('.facebook').click();
            expect(handler).to.be.calledWith('facebook');

            view.$('.twitter').click();
            expect(handler).to.be.calledWith('twitter');

            view.$('.gplus').click();
            expect(handler).to.be.calledWith('gplus');

            view.$('.email').click();
            expect(handler).to.be.calledWith('email');

            view.$('.link').click();
            expect(handler).to.be.calledWith('link');

            view.$('.embed').click();
            expect(handler).to.be.calledWith('embed');

            expect(handler.callCount).to.equal(6);
        });

        it('button order and occurence is customizable', function () {
            var view = new SocialButtonsWidget({
                buttons: ['twitter', 'embed', 'email']
            }).render();

            expect(view.$el.children().length).to.equal(3);
            expect(view.$el.children().first().hasClass('twitter')).to.be.true;
            expect(view.$el.children().last().hasClass('email')).to.have.true;
        });
    });
});

