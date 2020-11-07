var $ = require('jquery'),
    Marionette = require('marionette');


var behavior = Marionette.Behavior.extend({

    timeout: null,

    events: {
        'mouseenter .vp_menu_toggle': 'showMenu',
        'mouseenter .vp_dropdown_menu': 'cancelHide',
        'mouseleave .vp_dropdown_menu': 'onMouseLeave',
        "click .vp_menu_item a": "onMenuItemClick"
    },

    onMouseLeave: function(e) {
        this.timeout = setTimeout(function() {
            this.hideMenu(e);
        }.bind(this), 200);
    },

    onMenuItemClick: function(e) {
        e.preventDefault();
        var item = $(e.currentTarget).data("item");
        this.view.trigger("menu_click", item);
        this.hideMenu(e);
    },

    showMenu: function(e) {
        $(e.target).parent().addClass('vp_dropdown_open');
    },

    hideMenu: function(e) {
        $(e.target).closest('.vp_dropdown_menu').removeClass('vp_dropdown_open');
    },

    cancelHide: function() {
        clearTimeout(this.timeout);
    },

});

module.exports = behavior;