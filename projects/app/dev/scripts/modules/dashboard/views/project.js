var $ = require('jquery'),
    utils = require('mixins/utils'),
    BaseView = require('_deprecated/views/baseitemview'),
    template = require('./project.html'),
    template_menu = require('./project_context_menu.html');


var view = BaseView.extend({

    className: "project",

    template: template,

    behavior: {
        Stickit: {},
    },

    events: {
        "mouseleave .project_context_menu": "hideContextMenu",
        "mouseleave": "hideContextMenu",
        "click .project_context_menu": "hideContextMenu",
        "click .menu": "showContextMenu",
        "click .project_context_menu .button": "contextMenuButtonClicked",
        "click .title_top": function() {
            this.trigger("project_selected", this.model.get("id"));
        },
        "click .modifysetting": function(e) {
            if(this.$el.find('.modify_submenu').is(":visible")){
                this.$el.find('.modify_submenu').hide();
            } else {
                this.$el.find('.modify_submenu').show();
            }
            e.stopPropagation();
        }
        
    },

    onShow: function() {
        // ui updates
        var _this = this;
        this.listenTo(this.model, "change", function() {
            _this.updateUI();
        });
        this.updateUI();
    },

    showContextMenu: function()  {
        if (!this.contextMenu) {
            this.contextMenu = $(template_menu);
            this.$el.append(this.contextMenu);
            this.$el.addClass('menu_open');
        }
    },

    hideContextMenu: function() {
        if (this.contextMenu) {
            this.contextMenu.remove();
            this.contextMenu = false;
            this.$el.removeClass('menu_open');
        }
    },

    contextMenuButtonClicked: function(e) {
        var action = $(e.currentTarget).data('action');
        this.trigger(action, this.model.get('id'));
    },

    mapTitle: function(val) {
        return utils.utils.trimstring(val, 45);
    },
    mapDescription: function(val) {
        return utils.utils.trimstring(val, 120);
    },

    // update UI in reaction to upload events
    // needs to be cleaned up at some point in the future
    // and moved into the bindings part
    updateUI: function() {
        var img_css = "";

        var cover = this.model.attributes.detect_cover;
        if (cover == null) cover = '//app.videopath.com/style/img/vp_project_default.png';

        var number_of_videos = this.model.attributes.stats.number_of_videos;
        
        var dir_css_extra2='';
        if (number_of_videos == 1) {
            this.$el.find('.vp_dir_tab').hide();
        }
        if (number_of_videos != 1) {
            this.$el.find('.cover_container').addClass('vp_directory')
        }

        img_css = "background-color: white; background-image: url(\'" + cover + "\')";
        this.$el.find('.cover_container').attr('style', img_css);

        this.$el.find('.info_container .title').html(this.mapTitle(this.model.attributes.name));
        this.$el.find('.info_container .description').html(this.mapDescription(this.model.attributes.description));
    },


});
module.exports = view;
