var $ = require('jquery'),
    MF = require('helpers/environment_factory'),
    Controller = require('_old/controllers/other/keyboard_events/controller');


describe('Controllers: Other: KeyboardEvents', function() {

    function createKeyEvent(keyCode) {
        return {
            type: 'keydown',
            preventDefault: sinon.stub(),
            stopImmediatePropagation: sinon.stub(),
            keyCode: keyCode
        };
    }

    var controller,
        channel = MF.playerApiChannel(),
        player = {
            api: channel
        };

    beforeEach(function() {
        controller = new Controller(player);
    });

    afterEach(function() {
        controller.destroy();
        $(document).off('keydown');
        channel.command.reset();
    });

    describe('Global Events', function() {

        it('should not react to space key before init', function() {
            $(document).trigger(createKeyEvent(32));
            expect(channel.command).to.be.calledWith('toggle_play');
        });

        it('should should close overlay on escape', function() {
            $(document).trigger(createKeyEvent(27));
            expect(channel.command).to.be.calledWith('hide_marker_content');
        });
    });
});