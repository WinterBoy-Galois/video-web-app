define([
    'util/share_helpers'
], function(ShareHelpers) {

    describe('ShareHelpers', function() {

        it('exists', function () {
            expect(ShareHelpers).to.exist;
            expect(ShareHelpers).to.have.property('shareAction')
                .that.is.a('function');
            expect(ShareHelpers).to.have.property('sendEmail')
                .that.is.a('function');
            expect(ShareHelpers).to.have.property('showPopup')
                .that.is.a('function');
        });


        describe('shareAction', function() {

            var url = "www.test.de";

            beforeEach(function () {
                sinon.stub(window, 'open');
                sinon.stub(window, 'prompt');
            });

            afterEach(function () {
                sinon.restore(window, 'open');
                sinon.restore(window, 'prompt');
            });


            it('called with facebook opens a popup', function () {
                ShareHelpers.shareAction(url, 'facebook');
                expect(window.open).to.be.called;
                expect(window.open.args[0][0]).to.match(/www.test.de/);
                expect(window.open.args[0][1]).to.equal(ShareHelpers.plugins.facebook.name);
            });

            it('called with twitter opens a popup', function () {
                ShareHelpers.shareAction(url, 'twitter');
                expect(window.open).to.be.called;
                expect(window.open.args[0][0]).to.match(/www.test.de/);
                expect(window.open.args[0][1]).to.equal(ShareHelpers.plugins.twitter.name);
            });

            it('called with gplus opens a popup', function () {
                ShareHelpers.shareAction(url, 'gplus');
                expect(window.open).to.be.called;
                expect(window.open.args[0][0]).to.match(/www.test.de/);
                expect(window.open.args[0][1]).to.equal(ShareHelpers.plugins.gplus.name);
            });

            it('called with email opens a popup', function () {
                ShareHelpers.shareAction(url, 'email');
                expect(window.open).to.be.called;
                expect(window.open.args[0][0]).to.match(/www.test.de/);
                expect(window.open.args[0][0]).to.match(/^mailto:/);
            });

            it('called with link opens a prompt', function () {
                ShareHelpers.shareAction(url, 'link');
                expect(window.prompt).to.be.called;
                expect(window.prompt.args[0][0]).to.equal(ShareHelpers.plugins.link.name);
                expect(window.prompt.args[0][1]).to.match(/www.test.de/);
            });

            it('called with embed opens a prompt', function () {
                ShareHelpers.shareAction(url, 'embed');
                expect(window.prompt).to.be.called;
                expect(window.prompt.args[0][0]).to.equal(ShareHelpers.plugins.embed.name);
                expect(window.prompt.args[0][1]).to.match(/www.test.de/);
            });
        });

    });
});
