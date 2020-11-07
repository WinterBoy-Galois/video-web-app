var _ = require('underscore');


var modalStyles = {
    "green": "vp_modal_green",
    "red": "vp_modal_red",
    "grey": ""
};

var iconStyles = {
    'sticky': 'vp_message_icon_sticky'
};

var modalTypes = {
    "message": "vp_modal_message",
    "yesno": "vp_modal_yes"
};


function configToModalOptions(config) {

    var modalOptions = _.extend({
        className: ""
    }, _.pick(config, 'closeDisabled', 'size'));

    if (config.button) {
        modalOptions.buttons = [{
            title: config.button,
            className: 'vp_message_button',
            onClick: config.action || function() {
                if (config.buttonTarget) {
                    window.location.hash = config.buttonTarget;
                }
                this.trigger('close_modal');
            }
        }];
    }

    if (config.style) {
        modalOptions.className += " " + modalStyles[config.style];
    }

    if (config.iconStyle) {
        modalOptions.className += " " + iconStyles[config.iconStyle];
    }

    if (config.type) {
        modalOptions.className += " " + modalTypes[config.type];
    }

    modalOptions.className = modalOptions.className.trim();

    return modalOptions;
}


module.exports = {
    configToModalOptions: configToModalOptions
};