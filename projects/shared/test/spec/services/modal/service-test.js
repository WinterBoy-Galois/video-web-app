define([
    'jquery',
    'backbone',
    'marionette',
    'shared/services/modal/service',
    'shared/controllers/controller'
], function($, Backbone, Marionette, ModalService, Controller) {

    describe('ModalService', function() {

        var region, controller,
            FADING_TIME = 220;

        beforeEach(function() {
            region = new Marionette.Region({
                el: document.createElement('div')
            }),

            controller = new (Controller.extend({
                rootViewClass: Marionette.ItemView.extend({
                    template: '<p>Hello World</p>'
                }),
            }))();
        });

        afterEach(function() {
            controller.trigger('close_modal');
        });

        it('opens a modal in a region', function() {
            ModalService.showModalController(controller, region);

            expect(region.currentView.$el.text()).to.match(/Hello World/);
        });

        it('close modal on background click or closebtn click', function(done) {
            ModalService.showModalController(controller, region);

            region.currentView.$el.find('.vp_modal_background').click();
            setTimeout(function() {
                expect(region.currentView).not.to.exist;
                done();
            }, FADING_TIME);
        });

        it('close modal on closebtn click', function(done) {
            ModalService.showModalController(controller, region);

            region.currentView.$el.find('.vp_modal_close_button').click();
            setTimeout(function() {
                expect(region.currentView).not.to.exist;
                done();
            }, FADING_TIME);
        });

        it('injects a local jquery into the controller', function() {
            ModalService.showModalController(controller, region);

            expect(controller.local$).to.equal($);
        });

        it('can set a region before showing the modal', function() {
            ModalService.setModalRegion(region);
            ModalService.showModalController(controller);

            expect(region.currentView.$el.text()).to.match(/Hello World/);
        });

        it('sets buttons in the footer', function() {
            controller.modalOptions = {
                buttons: [
                    {
                        title: "close",
                    }, {
                        title: "action",
                        className: 'vp_action_button'
                    }, {
                        title: "destructive",
                        className: 'vp_destructive_button'
                    }
                ]
            };

            ModalService.showModalController(controller, region);
            var $btns = region.currentView.$el.find('.vp_modal_footer');

            expect($btns.find('.vp_modal_button').length).to.equal(3);
            expect($btns.find('.vp_action_button').length).to.equal(1);
            expect($btns.find('.vp_destructive_button').length).to.equal(1);
        });

        it('sets title of the modal', function() {
            controller.modalOptions = {
                title: "Hello Modal"
            };

            ModalService.showModalController(controller, region);
            var $view = region.currentView.$el;

            expect($view.find('.vp_modal_header .vp_modal_title').text())
                .to.equal(controller.modalOptions.title);
        });

        it('can disable default closing behavior', function() {
            controller.modalOptions = {
                closeDisabled: true
            };

            ModalService.showModalController(controller, region);
            var $view = region.currentView.$el;
            $view.find('.vp_modal_close_button').click();
            $view.find('.vp_modal_background').click();

            expect(region.currentView).to.exist;
        });
    });

});


