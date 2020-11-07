var $ = require('jquery'),
    _ = require('underscore'),
    config = require('config'),
    
    tinycolor = require('tinycolor'),

    // templates
    template = require('./view.html'),
    template_embed_iframe = require('./embed_iframe.html'),
    template_embed_lightbox = require('./embed_lightbox.html'),

    BaseView = require('_deprecated/views/baseitemview'),

    //operations
    previewVideoOp = require('app/operations/previewVideo'),
    shareEMailOp = require('app/operations/shareEmail');


var view = BaseView.extend({
    // do stuff
    tagName: "div",

    className: "vp_share page",

    template: template,

    events: {
        "click .tab": "onTabClicked",
        "click input, textarea": "inputFocused",
        "click .foldbutton": "onFoldClicked",
        "click .facebook": "onFacebookClick",
        "click .gplus": "onGPlusClick",
        "click .twitter": "onTwitterClick",
        "change .inline .advanced input": "updateInlineEmbed",
        "change .lightbox .advanced input": "updateLightboxEmbed",
        "keyup .inline .advanced input": "updateInlineEmbed",
        "keyup .lightbox .advanced input": "updateLightboxEmbed",
        "click .email .send": "onShareMail"
    },

    behaviors: {
        HistoryButtons: {}
    },

    initialize: function() {
        this.video = this.options.video;
        this.video_aspect = this.video.source.get("aspect");
        this.revision = this.options.revision;
        this.shareURL = config.shareBaseURL + this.video.get("key"); 
        this.updateInlineEmbed = _.debounce(this.updateInlineEmbed, 1000);
    },

    onShow: function() {
        //this.$el.find(".share").val(this.shareURL);
        $.getScript(config.embedURL);

        // templates
        this.embed_template = this.$el.find(".embed_code").remove();
        this.lightbox_template = this.$el.find(".lightbox_code").remove();

        if (!config.getQueryVariable("published")) {
            this.$el.addClass("share_only");
        }

        this.$el.find(".social input").val("http:" + this.shareURL);

        this.$el.find(".inline .width").val(700);

        this.$el.find(".lightbox .width").val(300);

        this.updateInlineEmbed();
        this.updateLightboxEmbed();

        this.$el.find(".foldout").hide();
        this.$el.find(".arr_down").hide();

        this.setupTooltips();
    },

    onShareMail: function() {
        shareEMailOp({
            video: this.video,
            message: this.$el.find(".email .message").val(),
            recipients: this.$el.find(".email .recipients").val()
        });
    },

    inputFocused: function(e) {
        if ($(e.currentTarget).hasClass("share_mail")) {
            return;
        }
        setTimeout(function() {
            $(e.target).select();
        }, 100);
    },

    updateInlineEmbed: function() {

        var code = $(template_embed_iframe);

        // get attrs
        var autoplay = this.$el.find(".inline .video_autoplay").is(':checked'),
            width = this.$el.find(".inline .width").val(),
            margin = (1.0 / this.video.source.get('aspect')) * 100;

        // set attrs
        code.find("iframe").attr("src", this.shareURL + (autoplay ? "/?autoplay=1" : ""));
        code.find(".vp_embed").css('max-width', width + "px");
        code.find(".vp_embed_inner").css('padding-bottom', margin + "%");

        // render
        this.$el.find(".inline textarea.code").val(code.html());
        this.$el.find(".inline .preview_container").html(code);
    },

    updateLightboxEmbed: function() {
        var code = $(template_embed_lightbox);


        // get attrs
        var width = this.$el.find(".lightbox .width").val(),
            margin = (1.0 / this.video.source.get('aspect')) * 100,
            video_key = this.video.get("key"),
            color = this.revision.get('ui_color_1'),
            color_button_text = this.revision.get('ui_color_button_text'),
            arrow_dark = false;

        if ( tinycolor(color).getLuminance() > 0.5 ) {
            arrow_dark = true;
        }
        if ( color_button_text && tinycolor(color_button_text).getLuminance() < 0.5) {
            arrow_dark = true;
        }

        // set attr
        code.find(".vp_thumbnail").css("max-width", width + "px");
        code.find(".vp_thumbnail").css("background-image", 'url("' + this.video.get("thumbnails").large + '")');
        code.find(".vp_thumbnail").attr("data-videopath-retain-aspect", this.video_aspect);
        code.find(".vp_thumbnail").attr("data-videopath-id", video_key);
        code.find(".vp_thumbnail_inner").css('padding-bottom', margin + "%");
        code.find(".vp_play_button").css('background-color', color);
        if ( arrow_dark ) {
            code.find(".vp_play_button").addClass('vp_dark');
        }

        // render
        this.$el.find(".lightbox textarea.code").val(code.html());
        this.$el.find(".lightbox .preview_container").html(code);

        var video = this.video;
        this.$el.find(".lightbox .preview_container .vp_thumbnail").click(function() {
            // show from vp embed code
            previewVideoOp({
                video:video
            });
        });
    },


    onTabClicked: function(e) {
        this.$el.find(".tab, .tabcontent").removeClass("active");
        $(e.currentTarget).addClass("active");
        if ($(e.currentTarget).hasClass("inline")) {
            this.$el.find(".tabcontent.inline").addClass("active");
        } else if ($(e.currentTarget).hasClass("lightbox")) {
            this.$el.find(".tabcontent.lightbox").addClass("active");
        } else {
            this.$el.find(".tabcontent.share").addClass("active");
        }
    },

    onFoldClicked: function(e) {
        $(e.currentTarget).parent().find(".foldout").slideToggle(200);
        $(e.currentTarget).find(".arr_left, .arr_down").toggle();
    },

    onTwitterClick: function() {
        var url = "https://twitter.com/home?status=" + "http:" + this.shareURL;
        this.showPopup(url, "Twitter", 400, 400);
    },
    onFacebookClick: function() {
        var url = "https://www.facebook.com/sharer/sharer.php?u=" + this.shareURL;
        this.showPopup(url, 'Facebook', 400, 400);
    },
    onGPlusClick: function() {
        var url = "https://plus.google.com/share?url=" + this.shareURL;
        this.showPopup(url, "Google Plus", 500, 500);
    },
    onPinterestClick: function() {
        var url = "https://www.pinterest.com/pin/create/button/?media=" + this.shareURL;
        this.showPopup(url, "Google Plus", 500, 500);
    },
    onTumblrClick: function() {
        var url = "https://www.tumblr.com/share/link?url=" + this.shareURL;
        this.showPopup(url, "Google Plus", 500, 500);
    },

    showPopup: function(url, title, width, height) {
        var left = (screen.width / 2) - (width / 2);
        var top = (screen.height / 2) - (height / 2);
        var opts = 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' + width + ', height=' + height + ', top=' + top + ', left=' + left;
        window.open(url, title, opts);
    },

});
module.exports = view;
