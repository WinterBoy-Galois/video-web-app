var Controller = require('shared/controllers/controller'),
    LayoutView = require('./views/layout'),
    ViewController = require('./controllers/view/controller'),
    EditController = require('./controllers/edit/preview_controller');


module.exports = Controller.extend({

    rootViewClass: LayoutView,

    views: {

        "rootView": {
            events: {
                "background_clicked": function() {
                    this.options.api.command("replay");
                }
            }
        },

    },

    onRootViewShow: function() {
        this.setupCommands();
    },

    setupCommands: function() {

        var _this = this;

        function showEndscreen() {
            var controller;

            if (_this.options.playerState.get("mode") === _this.options.playerState.modes.BUILDER) {
                controller = new EditController(_this.options);
            } else {
                controller = new ViewController(_this.options);
            }

            _this.subViewController = controller;
            _this.rootView.showEndscreen(controller.rootView);
        }

        function hideEndscreen() {
            if (_this.subViewController) {
                _this.rootView.hideEndscreen();
                _this.subViewController.destroy();
                _this.subViewController = null;
            }
        }

        // show endscreen, view or edit mode, depends..
        this.listenTo(this.options.playerState, "change:endscreen_showing", function(state, showing) {
            if (showing) {
                showEndscreen();
            } else {
                hideEndscreen();
            }
        });

    },

});