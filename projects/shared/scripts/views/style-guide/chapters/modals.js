var _ = require('underscore'),
    Marionette = require('marionette'),
    Controller = require('shared/controllers/controller'),
    ModalService = require('services/modal/service'),
    PlanData = require('shared/configs/plans/data'),
    PlanModals = require('shared/configs/plans/modal_data'),
    template = require('./modals.html');


var greetings = PlanModals.greetings,
    plans = PlanData.plans;

module.exports = Marionette.ItemView.extend({
    template: template,

    events: {
        'click .sg_modal_button_standard': 'onStandardBtnClick',
        'click .sg_modal_button_custom': 'onCustomBtnClick',
        'click .sg_modal_button_green': 'onGreenBtnClick',
        'click .sg_modal_button_red': 'onRedBtnClick',
        'click .sg_modal_button_fullsize': 'onFullSizeBtnClick',
        'click .sg_modal_button_plan_free_downgrade': function(e) {
            e.preventDefault();
            ModalService.showMessageModal(greetings[plans.FREE].downgrade);
        },
        'click .sg_modal_button_plan_basic_upgrade': function(e) {
            e.preventDefault();
            ModalService.showMessageModal(greetings[plans.BASIC].upgrade);
        },
        'click .sg_modal_button_plan_basic_downgrade': function(e) {
            e.preventDefault();
            ModalService.showMessageModal(greetings[plans.BASIC].downgrade);
        },
        'click .sg_modal_button_plan_pro_upgrade': function(e) {
            e.preventDefault();
            ModalService.showMessageModal(greetings[plans.PRO].upgrade);
        },
        'click .sg_modal_button_plan_pro_downgrade': function(e) {
            e.preventDefault();
            ModalService.showMessageModal(greetings[plans.PRO].downgrade);
        },
        'click .sg_modal_button_plan_pro_plus_upgrade': function(e) {
            e.preventDefault();
            ModalService.showMessageModal(greetings[plans.PRO_PLUS].upgrade);
        },
        'click .sg_modal_button_plan_pro_plus_downgrade': function(e) {
            e.preventDefault();
            ModalService.showMessageModal(greetings[plans.PRO_PLUS].downgrade);
        },
        'click .sg_modal_button_plan_premium_upgrade': function(e) {
            e.preventDefault();
            ModalService.showMessageModal(greetings[plans.PREMIUM].upgrade);
        },
        'click .sg_modal_button_plan_cancel': function(e) {
            e.preventDefault();
            ModalService.showMessageModal(PlanModals.accountCanceled);
        },
        'click .sg_modal_button_upgrade_endscreen': function(e) {
            e.preventDefault();
            var modalConfig = _.extend(PlanModals.upgradeEndscreen, {
                action: function() {}
            });
            ModalService.showMessageModal(modalConfig);
        }
    },

    onStandardBtnClick: function(e) {
        e.preventDefault();

        ModalService.showModalController(
            new(Controller.extend({
                rootViewClass: Marionette.ItemView.extend({
                    template: '<p>Hello Modal World</p>'
                }),
            }))()
        );
    },

    onCustomBtnClick: function(e) {
        e.preventDefault();

        // Open modal with custom options
        ModalService.showModalController(
            new(Controller.extend({
                rootViewClass: Marionette.ItemView.extend({
                    template: '<p>Modal with full configuration. Autoclose disabled</p>',
                }),

                //the cusom modal options
                modalOptions: {
                    title: "The best modal ever!",
                    closeDisabled: true,
                    size: {
                        width: 500
                    },
                    buttons: [{
                        title: "close",
                        onClick: function() {
                            this.trigger('close_modal');
                        }
                    }, {
                        title: "action",
                        className: 'vp_action_button'
                    }, {
                        title: "destructive",
                        className: 'vp_destructive_button'
                    }],
                }
            }))()
        );
    },

    onGreenBtnClick: function(e) {
        e.preventDefault();

        // Open modal with custom options
        ModalService.showModalController(
            new(Controller.extend({
                rootViewClass: Marionette.ItemView.extend({
                    template: '<p>This modal has green borders!<br> This can be achieved by a custom class in controller config.</p>',
                }),

                //the cusom modal options
                modalOptions: {
                    title: "Green Modal",
                    className: 'vp_modal_green',
                    size: {
                        width: 400
                    },
                    buttons: [{
                        title: "close",
                        onClick: function() {
                            this.trigger('close_modal');
                        }
                    }, {
                        title: "action",
                        className: 'vp_action_button'
                    }],
                }
            }))()
        );
    },

    onRedBtnClick: function(e) {
        e.preventDefault();

        // Open modal with custom options
        ModalService.showModalController(
            new(Controller.extend({
                rootViewClass: Marionette.ItemView.extend({
                    template: '<p>Do you realy want to delete your accout?</p>',
                }),

                //the cusom modal options
                modalOptions: {
                    title: "Critical Operation",
                    className: 'vp_modal_red',
                    buttons: [{
                        title: "abort",
                        onClick: function() {
                            this.trigger('close_modal');
                        }
                    }, {
                        title: "delete",
                        className: 'vp_destructive_button'
                    }],
                }
            }))()
        );
    },

    onFullSizeBtnClick: function(e) {
        e.preventDefault();

        // Open modal with custom options
        ModalService.showModalController(
            new(Controller.extend({
                rootViewClass: Marionette.ItemView.extend({
                    template: '<div><iframe width="100%" src="//www.youtube.com/embed/orJG3pf351o?rel=0" frameborder="0" allowfullscreen></iframe></div>',
                }),

                //the cusom modal options
                modalOptions: {
                    className: 'vp_modal_video',
                    size: {
                        width: '90%'
                    }
                }
            }))()
        );
    }
});