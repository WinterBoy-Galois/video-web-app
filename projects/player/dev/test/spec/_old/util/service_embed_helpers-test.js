var eh = require('_old/util/service_embed_helpers');


module.exports = describe('Util: Service Embed Helpers', function() {

    describe('Create Embed Code', function() {
        it('should not crash on bogus service', function() {
            var code = eh.createEmbedCode("bogus", "33455663");
            expect(code.length).to.equal(0);
        });

        it('should create embed codes for vimeo', function() {
            var code = eh.createEmbedCode("vimeo", "33455663");
            expect(code.length).to.be.above(5);
        });

        it('should create embed codes for youtube', function() {
            var code = eh.createEmbedCode("youtube", "33455663");
            expect(code.length).to.be.above(5);
        });

        it('should create embed codes for soundcloud', function() {
            var code = eh.createEmbedCode("soundcloud", "artist/song");
            expect(code.length).to.be.above(5);
        });

        it('should create embed codes for instagram', function() {
            var code = eh.createEmbedCode("instagram", "33455663");
            expect(code.length).to.be.above(5);
        });
    });

    describe('Extract info', function() {


        // test
        it('should not crash on bogus url', function() {
            var result = eh.extractService("http://adio4nalsdfkn");
            expect(result).to.equal(null);
        });


        // youtube
        it('should extract youtube example 1', function() {
            var result = eh.extractService("https://www.youtube.com/watch?v=mQ9OWMsJBTk");
            expect(result.service).to.equal("youtube");
            expect(result.service_id).to.equal("mQ9OWMsJBTk");
        });

        it('should extract youtube example 2', function() {
            var result = eh.extractService("http://youtu.be/mQ9OWMsJBTk");
            expect(result.service).to.equal("youtube");
            expect(result.service_id).to.equal("mQ9OWMsJBTk");
        });

        it('should extract youtube example 3', function() {
            var result = eh.extractService("//www.youtube.com/embed/mQ9OWMsJBTk?rel=0");
            expect(result.service).to.equal("youtube");
            expect(result.service_id).to.equal("mQ9OWMsJBTk");
        });


        // vimeo
        it('should extract vimeo example 1', function() {
            var result = eh.extractService("https://vimeo.com/67768281");
            expect(result.service).to.equal("vimeo");
            expect(result.service_id).to.equal("67768281");
        });

        it('should extract vimeo example 2', function() {
            var result = eh.extractService("http://vimeo.com/67768281");
            expect(result.service).to.equal("vimeo");
            expect(result.service_id).to.equal("67768281");
        });


        // soundcloud
        it('should extract soundcloud example 1', function() {
            var result = eh.extractService("https://soundcloud.com/zedsdead/sets/somewhere-else-ep");
            expect(result.service).to.equal("soundcloud");
            expect(result.service_id).to.equal("zedsdead/sets/somewhere-else-ep");
        });

        it('should extract soundcloud example 2', function() {
            var result = eh.extractService("https://soundcloud.com/zedsdead/hadouken?some-other-info");
            expect(result.service).to.equal("soundcloud");
            expect(result.service_id).to.equal("zedsdead/hadouken");
        });

        it('should extract soundcloud example 3', function() {
            var result = eh.extractService("https://soundcloud.com/zedsdead/zeds-dead-2014-diplo-and-friends-mix");
            expect(result.service).to.equal("soundcloud");
            expect(result.service_id).to.equal("zedsdead/zeds-dead-2014-diplo-and-friends-mix");
        });

        it('should extract soundcloud example 4', function() {
            var result = eh.extractService("https://soundcloud.com/barclay_jones/barclay-jones-bjs-and-6s-1");
            expect(result.service).to.equal("soundcloud");
            expect(result.service_id).to.equal("barclay_jones/barclay-jones-bjs-and-6s-1");
        });

        // instagram
        it('should extract instagram example 1', function() {
            var result = eh.extractService("https://instagram.com/p/bNd86MSFv6/");
            expect(result.service).to.equal("instagram");
            expect(result.service_id).to.equal("bNd86MSFv6");
        });


    });

});