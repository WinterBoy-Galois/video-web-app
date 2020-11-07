var EF = require('helpers/environment_factory'),
    Controller = require('_old/controllers/main');


module.exports = xdescribe('Controllers: Style: Controller Integration', function() {

    var layout, player, engine, c, style, video;

    beforeEach(function() {
        layout = EF.rootRegion();
        player = EF.simplePlayerApi();
        video = EF.simpleVideo();
        engine = {
            rootView: EF.simpleView()
        };
        c = new Controller({
            player: player,
            engine: engine,
            video: video
        });
        layout.show(c.rootView);
    });

    afterEach(function() {
        c.destroy();
    });

    describe("integration tests", function() {

        var $el;

        beforeEach(function() {
            $el = layout.$el;
        });

        it('have prerequisites', function() {
            expect($el).to.exist;
        });

        it('should be able to color playbar', function() {
            video.set({
                ui_color_playbar_background: "red",
                ui_color_playbar_outline: "green",
            });
            expect($el.find(".vp_bar").css("background-color")).to.equal("rgb(255, 0, 0)");
            //expect($el.find(".vp_bar").css("border-color")).to.equal("rgb(0, 255, 0)");
        });

        it('should be able to color playbar 2', function() {
            video.set({
                ui_color_playbar_buffer: "red",
                ui_color_playbar_progress: "green"
            });
            expect($el.find(".vp_buffer").css("background-color")).to.equal("rgb(255, 0, 0)");
            expect($el.find(".vp_progress").css("background-color")).to.equal("rgb(0, 128, 0)");
        });

        it('should be able to color indicators', function() {
            video.set({
                ui_color_playbar_buffer: "red",
                ui_color_playbar_progress: "green"
            });
            expect($el.find(".vp_buffer").css("background-color")).to.equal("rgb(255, 0, 0)");
            expect($el.find(".vp_progress").css("background-color")).to.equal("rgb(0, 128, 0)");
        });

    });


});