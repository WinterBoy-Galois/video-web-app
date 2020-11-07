var $ = require('jquery'),
    utils = require('mixins/utils'),
    BaseView = require('_deprecated/views/baseitemview'),
    template = require('./video.html'),
    template_menu = require('./video_context_menu.html');


var view = BaseView.extend({

    className: "video",

    template: template,

    behavior: {
        Stickit: {},
    },

    events: {
        "mouseleave .video_context_menu": "hideContextMenu",
        "mouseleave": "hideContextMenu",
        "click .video_context_menu": "hideContextMenu",
        "click .menu": "showContextMenu",
        "click .video_context_menu .button": "contextMenuButtonClicked",
        "click .edit": function() {
            this.trigger("edit_clicked", this.model.get("id"));
        },
        "click .view": function() {
            this.trigger("view_clicked", this.model.get("id"));
        },
        "click .share": function() {
            this.trigger("share_clicked", this.model.get("id"));
        },
        "click .analytics": function() {
            this.trigger("analytics_clicked", this.model.get("id"));
        },
        "click .title_top": function() {
            this.trigger("edit_clicked", this.model.get("id"));
        },
        "error .thumb": "onImageError",
        "click .list_checkbox": function(e) {
            this.trigger("item_checked", {
                id: this.model.get("id"),
                selected: e.target.checked,
            });
        },
        "click .videolist_imghover": function() {
            this.trigger("view_clicked", this.model.get("id"));
        }
    },


    onImageError: function() {
        this.$el.find(".thumb").hide();
    },

    // manually set up bindings here
    setupBindings: function() {

        // bind video object
        this.stickit(this.model, {
            ".views .value": "total_plays",
            ".date": {
                observe: "created",
                onGet: function(val) {
                    return "added " + utils.utils.timeago(val);
                }
            },
            ".videolist_creation .listvalue": {
                observe: "created",
                onGet: function(val) {
                    dt = new Date(Date.parse(val))
                    return dt.toLocaleString('default', { month: 'long' }) + ' ' + dt.getDate() + ',' + (dt.getYear() + 1900);
                }
            },
            ":el": {
                observe: "current_revision",
                update: function($el, val) {
                    $el.toggleClass("published", !!val);
                    $el.toggleClass("unpublished", !val);
                    $el.find(".published").toggleClass("inactive", !val);
                }
            }
        });

        // bind revision info object
        function mapTitle(val) {
            return utils.utils.trimstring(val, 45);
        }

        this.stickit(this.model.revision_info, {
            ".title_top .title": {
                observe: "title",
                onGet: mapTitle
            },
            ".info_container .title": {
                observe: "title",
                onGet: mapTitle
            },
            ".videolist_title .listvalue": {
                observe: "title",
                onGet: mapTitle
            },
            ".markers .value": "marker_count",
        });

        this.stickit(this.model.source, {
            ".mobile_enabled": {
                observe: 'sprite_support',
                update: function($el, val) {
                    $el.toggleClass('vp_removed', !val);
                }
            }
        });

        // bind source info object
        if (this.model.source)  {
            this.stickit(this.model.source, {
                ".duration .value": {
                    observe: "duration",
                    onGet: function(val) {
                        return this.secToMinSecString(val);
                    }
                }
            });
        }

    },

    setupTimer: function() {
        var model = this.model;
        if (model.source.get('service') === 'videopath') {
            this.timer = setInterval(function() {
                var status = model.source.get("status");
                if (status === 'processing') {
                    model.fetch();
                }
            }, 10000);
        }
    },

    onShow: function() {

        this.setupBindings();
        this.setupTimer();

        // ui updates
        // for progress
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


    onDestroy: function() {
        clearInterval(this.timer);
    },

    // update UI in reaction to upload events
    // needs to be cleaned up at some point in the future
    // and moved into the bindings part
    updateUI: function() {

        var model = this.model;

        // file state
        var statusClass = "",
            statusText = "",
            status = 0;

        // if we have a video file
        // set the right state on the view
        if (model.source && model.source.get('service') === 'videopath') {
            status = model.source.get("status");
            if (status === 'processing') {
                statusClass = "processing";
                statusText = "Processing";
            } else if (status === 'error') {
                statusClass = "error";
                statusText = "Error processing file";
            } else if (status === 'awaiting_upload') {
                statusClass = "waiting";
                statusText = "Click to add video";
            }
        }

        // if there is no source at all
        else if (!model.source) {
            statusClass = "waiting";
            statusText = "Waiting for video";
        }

        // set the right text and title on the view
        this.$el.find(".working_title").html(statusText);
        this.$el.removeClass("waiting").removeClass("processing").removeClass("error");
        this.$el.addClass(statusClass);

        // set thumbnail ( if available )
        if (model.hasThumbnail() && model.source.get('status') == 'ok') {
            this.$el.find(".img_container").css("background-image", "url('" + model.get("thumbnails").normal + "')");
        } else {
            this.$el.find(".thumb").hide();
        }

        //------- for list view
        
        // set thumbnail ( if available )
        if (model.hasThumbnail() && model.source.get('status') == 'ok') {
            this.$el.find(".videolist_img").css("background-image", "url('" + model.get("thumbnails").normal + "')");
        }
        
        // bind Project Name     
        this.$el.find('.videolist_projectname .listvalue').html(this.options.model.collection.owner.videos.owner.attributes.name);

        // TODO privacy
        this.$el.find('.videolist_privacy .listvalue').html('Public');

        // TODO status
        this.$el.find('.videolist_status .listvalue').html('Complete');
    },


});
module.exports = view;
