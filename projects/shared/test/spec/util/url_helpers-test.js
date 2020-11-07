define([
    'util/url_helpers'
], function(url) {

    describe('Util: UrlHelpers', function() {

        describe('isEmail', function() {

            it('checks for a valid email', function() {
                expect(url.isEmail("f@me.de")).to.be.true;
                expect(url.isEmail("mama.mia@me.home")).to.be.true;
                expect(url.isEmail("_lala@me.de")).to.be.true;
                expect(url.isEmail("LALA@ME.DE")).to.be.true;
                expect(url.isEmail("@me.de")).to.be.false;
                expect(url.isEmail("f@me")).to.be.false;
                expect(url.isEmail("fme.de")).to.be.false;
                expect(url.isEmail("mama mia@me.home")).to.be.false;
            });

            it('does allows leading/tailing whitespace', function() {
                expect(url.isEmail("mama.mia@me.home ")).to.be.true;
                expect(url.isEmail(" mama.mia@me.home")).to.be.true;
                expect(url.isEmail("\tmama.mia@me.home")).to.be.true;
            });
        });

        describe('hasURLPrefix', function() {

            it('checks weather an url has a valid prefix', function() {
                expect(url.hasURLPrefix("http://fofof")).to.be.true;
                expect(url.hasURLPrefix("https://fofof")).to.be.true;
                expect(url.hasURLPrefix("ftp://fofof")).to.be.true;
                expect(url.hasURLPrefix("ftp://fofof")).to.be.true;
                expect(url.hasURLPrefix("HTTP://fofof")).to.be.true;

                expect(url.hasURLPrefix("httpf://fofof")).to.be.false;
                expect(url.hasURLPrefix("httpsss://fofof")).to.be.false;
                expect(url.hasURLPrefix("ftp//fofof")).to.be.false;
                expect(url.hasURLPrefix("http:/fofof")).to.be.false;
                expect(url.hasURLPrefix("ftp/fofof")).to.be.false;
                expect(url.hasURLPrefix("httpfofo")).to.be.false;
            });

            it('does allow leading/tailing whitespace', function() {
                expect(url.hasURLPrefix(" http://fofof")).to.be.true;
                expect(url.hasURLPrefix("http://fofof ")).to.be.true;
            })
        });

        describe('isEmailAction', function() {
            it('checks if url has mailto: prefix', function() {
                expect(url.isEmailAction("mailto:me")).to.be.true;

                expect(url.isEmailAction("maito:me")).to.be.false;
                expect(url.isEmailAction("mailtoe")).to.be.false;
            });
        });

        describe('prependURLPrefix', function() {
            it('prepends the prefix to a string', function() {
                expect(url.prependURLPrefix("lsls")).to.equal('http://lsls');
            });

            it('leaves prefixed urls unchanged', function() {
                expect(url.prependURLPrefix('http://fufu')).to.equal('http://fufu');
                expect(url.prependURLPrefix('https://fufu')).to.equal('https://fufu');
            });

            it('trims whitespace', function() {
                expect(url.prependURLPrefix(' asdfasdf ')).to.equal('http://asdfasdf');
            });
        });

        describe('prependEmailPrefix', function() {
            it('prepends the prefix to a string', function() {
                expect(url.prependEmailPrefix("lsls")).to.equal('mailto:lsls');
            });

            it('leaves prefixed urls unchanged', function() {
                expect(url.prependEmailPrefix('mailto:fufu')).to.equal('mailto:fufu');
            });

            it('trims whitespace', function() {
                expect(url.prependEmailPrefix(' asdfasdf ')).to.equal('mailto:asdfasdf');
            });
        });

        describe('processURLInput', function() {
            it('leaves prefixed email actions or urls untouched', function() {
                expect(url.processURLInput('mailto:foo')).to.equal('mailto:foo');
                expect(url.processURLInput('http://foo')).to.equal('http://foo');
            });

            it('appends mailto to emails and url prefix to other input', function() {
                expect(url.processURLInput('foo@bar.com')).to.equal('mailto:foo@bar.com');
                expect(url.processURLInput('bar.com')).to.equal('http://bar.com');
            });

            it('can be used in stream', function() {
                var stream = ['google.com', 'foo@bar.de'];

                expect(stream.map(url.processURLInput))
                    .to.deep.equal(['http://google.com', 'mailto:foo@bar.de']);
            });
        });

        describe('isValidURL', function() {
            it('makes basic URL checks on a string', function() {
                expect(url.isValidURL('bar.com')).to.be.true;
                expect(url.isValidURL(' bar.com ')).to.be.true;
                expect(url.isValidURL('barcom')).to.be.false;
                expect(url.isValidURL('bar .com')).to.be.false;
            });
        });

        // Google Fonts specific url handler

        // mainly taken from https://developers.google.com/fonts/docs/getting_started
        var googleTestUrls = [
            '//fonts.googleapis.com/css?family=Indie+Flower',
            '//fonts.googleapis.com/css?family=Shadows+Into+Light',
            'http://fonts.googleapis.com/css?family=Anonymous+Pro:italic&subset=greek',
            '//fonts.googleapis.com/css?family=Anonymous+Pro&subset=greek',
            '//fonts.googleapis.com/css?family=Tangerine|Inconsolata|Droid+Sans',
            '//fonts.googleapis.com/css?family=Inconsolata&text=%c2%a1Hola!',
            '//fonts.googleapis.com/css?family=Inconsolata&text=Hello%20World',
            '//fonts.googleapis.com/css?family=Tangerine:bold,bolditalic|Inconsolata:italic|Droid+Sans',
            '//fonts.googleapis.com/css?family=Cantarell:i|Droid+Serif:700'
        ];

        describe('parseFontFamilyFromGoogleFontsUrl', function() {

            it('retrieves the font family from the google font url', function() {
                expect(googleTestUrls.map(url.parseFontFamilyFromGoogleFontsUrl))
                    .to.deep.equal([
                        "'Indie Flower'",
                        "'Shadows Into Light'",
                        "'Anonymous Pro'",
                        "'Anonymous Pro'",
                        "'Tangerine', 'Inconsolata', 'Droid Sans'",
                        "'Inconsolata'",
                        "'Inconsolata'",
                        "'Tangerine', 'Inconsolata', 'Droid Sans'",
                        "'Cantarell', 'Droid Serif'"
                    ]);
            });

            it('fails savely on invalid input', function() {
                expect(url.parseFontFamilyFromGoogleFontsUrl('fufu')).to.equal("''");
            });
        });

        describe('checkValidGoogleFontsUrl', function() {

            it('returns the url on parsable google urls', function() {
                var results = googleTestUrls.map(url.checkValidGoogleFontsUrl);
                expect(results).to.deep.equal(googleTestUrls);
                expect(url.checkValidGoogleFontsUrl('//fonts.googleapis.com/css?family='))
                    .to.equal('//fonts.googleapis.com/css?family=');
            });

            it('returns empty string on invalid input', function() {
                expect(url.checkValidGoogleFontsUrl('fufuf')).to.equal('');
                expect(url.checkValidGoogleFontsUrl('//fonts.googleapis.com/css?famiily=Indie+Flower')).to.equal('');
                expect(url.checkValidGoogleFontsUrl('//fonts.googleapis.com/css')).to.equal('');
                expect(url.checkValidGoogleFontsUrl('//fonts.googleapis.com/css?family')).to.equal('');
                expect(url.checkValidGoogleFontsUrl('//fonts.googleapiis.com/css?family=')).to.equal('');

                expect(url.checkValidGoogleFontsUrl(null)).to.equal('');
                expect(url.checkValidGoogleFontsUrl(true)).to.equal('');
                expect(url.checkValidGoogleFontsUrl(12345)).to.equal('');
            });
        });
    });
});
