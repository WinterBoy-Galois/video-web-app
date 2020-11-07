var _ = require('underscore'),
    $ = require('jquery'),
    Marionette = require('marionette'),
    template = require('./view.html');


module.exports = Marionette.ItemView.extend({

    template: template,
    className: "vp_text",

    bindings: {
        '.vp_service_loading': {
            observe: "loading",
            update: function($el, val) {
                $el.toggleClass("vp_removed", !val);
            }
        },
        '.vp_no_service': {
            observe: "no_service",
            update: function($el, val) {
                $el.toggleClass("vp_removed", !val);
            }
        },
        
        '.list': {
            observe:['lists', 'service_id'],
            update: function($el, val) {
                $el.empty();
                $el.append($('<option></option>').val('-').html('-'));
                _.each(val[0], function(item){
                    $el.append($('<option></option>').val(item.key).html(item.title));
                });
                if ( val[1] ) {
                    $el.val(val[1]);
                }

            }
        },

        '.provider': {
            observe:['services','service'],
            update: function($el, val) {
                $el.empty();
                $el.append($('<option></option>').val('-').html('-'));
                _.each(val[0], function(item){
                    $el.append($('<option></option>').val(item.key).html(item.title));
                });
                if ( val[1] ) {
                    $el.val(val[1]);
                }
            }
        },
        '.text': {
            observe:'text',
            update: function($el, val) {
                $el.val(val);
            }
        }
    },

    events: {
        'change .provider': function(e) {
            this.trigger('change_provider', $(e.currentTarget).val());
        },
        'change .list': function(e) {
            this.trigger('change_list', $(e.currentTarget).val());
        },
        'keyup .text': function(e) {
            this.trigger('change_text', $(e.currentTarget).val());
        },
        'click a.configure': function(e) {
            e.preventDefault();
            this.trigger('configure_clicked');
        }
    },

    behaviors: {
        Stickit: {},
        SelfTest: {},
    },


});