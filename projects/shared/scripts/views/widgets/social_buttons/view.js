var Backbone = require('backbone'),
    Marionette = require('marionette');

require('stickit');


var ChildView = Marionette.ItemView.extend({
    template: false,
    tagName: 'a',
    className: 'vp_social_button',

    events: {
        'click': 'onClick'
    },

    behaviors: {
        FastClick: {}
    },

    onRender: function() {
        this.$el.addClass(this.model.get('className'))
            .attr('title', this.model.get('title'));
    },

    onClick: function(e) {
        this.trigger('share_clicked', this.model.get('action'));
        e.stopImmediatePropagation();
    }

});

module.exports = Marionette.CollectionView.extend({

    template: false,
    className: "vp_share_widget",
    tagName: "nav",

    // options
    disabled: false,

    childView: ChildView,

    childEvents: {
        'share_clicked': 'onClick'
    },

    shareButtonsData: {
        facebook: {
            title: "Facebook",
            className: 'facebook',
            action: 'facebook',
        },
        twitter: {
            title: "Twitter",
            className: 'twitter',
            action: 'twitter'
        },
        gplus: {
            title: "Google Plus",
            className: 'gplus',
            action: 'gplus'
        },
        email: {
            title: "Email",
            className: 'email',
            action: 'email'
        },
        link: {
            title: "Share link",
            className: 'link',
            action: 'link'
        },
        embed: {
            title: "Embed code",
            className: 'embed',
            action: 'embed'
        }
    },

    // default buttons
    buttons: ['facebook', 'twitter', 'gplus', 'email', 'link', 'embed'],

    initialize: function() {
        // fill the model collection with buttons
        var collection = new Backbone.Collection(),
            buttons = this.getOption('buttons'),
            shareButtons = this.shareButtonsData;

        collection.add(buttons.map(function(id) {
            return shareButtons[id];
        }));

        this.collection = collection;
    },

    onClick: function(_, action) {
        if (!this.getOption('disabled')) {
            this.trigger('share_clicked', action);
        }
    }

});