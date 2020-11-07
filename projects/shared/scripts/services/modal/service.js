var _ = require('underscore'),
    $ = require('jquery'),
    Backbone = require('backbone'),
    Marionette = require('marionette'),
    Controller = require('./controller'),
    BaseController = require('shared/controllers/controller'),
    ModalWidget = require('widgets/modal_message/view'),
    helpers = require('./helpers');

require('spectrum');


var modalRegion;
var evts = _.extend({}, Backbone.Events);

function showModalController(controller, region) {
    region = region || modalRegion;

    console.log(region);

    // set a jquery with the local context
    controller.local$ = $;

    var modalController = new Controller({
        contentController: controller
    });

    region.show(modalController.rootView);
    modalController.showModal();

    evts.listenTo(modalController, "modal_closed", function() {
        modalController.destroy();
        region.empty();
    });
}

function setModalRegion(region) {
    modalRegion = region;
}

/* alerts, confirms, simple messages */


// show confirmation modal
var confirmDefaults = {
    style: "green",
    confirmButton: "OK",
    cancelButton: "Cancel"
};

var classNames = {
    "green": "vp_modal_green",
    "orange": "vp_modal_orange",
    "red": "vp_modal_red",
};

var buttonClassNames = {
    "green": "vp_action_button",
    "orange": "vp_destructive_button",
    "red": "vp_destructive_button",
};

function showAlert(config) {
    var dfd = new $.Deferred();
    config.buttons = [{
        title: "OK",
        onClick: function() {
            this.trigger('close_modal');
            dfd.resolve();
        }
    }];
    if (config.style) {
        config.className = classNames[config.style];
    }
    showSimpleModal(config);
    return dfd.promise();
}

function confirm(config) {
    config = _.extend({}, confirmDefaults, config);
    var dfd = new $.Deferred();
    config.buttons = [{
        title: config.cancelButton,
        onClick: function() {
            this.trigger('close_modal');
            dfd.reject();
        }
    }, {
        title: config.confirmButton,
        className: buttonClassNames[config.style],
        onClick: function() {
            this.trigger('close_modal');
            dfd.resolve();
        }
    }];
    config.className = classNames[config.style];
    showSimpleModal(config);
    return dfd.promise();
}

// show simple modal
function showSimpleModal(config) {

    config.closeDisabled = true;
    var c = BaseController.extend({
        rootViewClass: Marionette.ItemView.extend({
            template: '<p>' + config.text + '</p>'
        }),
        modalOptions: config
    });

    showModalController(
        new c()
    );

}


/* message modals */

var defaultMessageOptions = {
    type: "message", // 'message' is only option
    style: "green", // 'green' or 'red'
    title: "",
    icon: "", // url to an icon image
    iconStyle: "", // only option now is 'sticky', that sticks the icon to the upper border
    message: "",
    button: "", // when only one button required, give the title here
    action: null // function, will be registered on button click
        // all other Modal Controller options can be provided as well
};

function createMessageController(messageObject) {
    var opts = _.extend({}, defaultMessageOptions, messageObject);

    var controller = new(BaseController.extend({
        buildRootView: function() {
            return new ModalWidget({
                model: new Backbone.Model(opts)
            });
        },

        modalOptions: helpers.configToModalOptions(opts)
    }))();

    return controller;
}

function showMessageModal(messageObject, region) {
    showModalController(createMessageController(messageObject), region);
}

module.exports = {
    showModalController: showModalController,
    setModalRegion: setModalRegion,
    showMessageModal: showMessageModal,
    showAlert: showAlert,
    showSimpleModal: showSimpleModal,
    confirm: confirm
};