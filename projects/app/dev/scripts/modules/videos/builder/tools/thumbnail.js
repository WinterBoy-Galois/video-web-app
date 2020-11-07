var BaseView = require('./toolbar_baseview'),
    template = require('./thumbnail.html');


var view = BaseView.extend({

    template: template,
    events: {
        "click": "preventBubble",
        "click .done": "onDoneClick",
        "click .upload_own": "onUploadOwnClick",
        "change .upload_field": "onFileSelected",
    },

    onRender: function() {
        var url = this.revision.get('thumbnails').large;
        this.setThumb(url);
    },

    setThumb: function(url) {
        this.$el.find(".custom_thumb").css("background-image", "url(" + url + ")");
    },

    onUploadOwnClick: function() {
        this.$el.find(".upload_field")[0].click();
    },

    onFileSelected: function() {
        this.$el.find(".select").hide();
        this.$el.find(".own").show();
        this.$el.find(".own").addClass("loading");
        var files = this.$el.find(".upload_field")[0].files;
        var _this = this;
        if (files.length > 0) {
            this.revision.uploadThumbnail(files[0]).
            then(function() {
                var localURL = URL.createObjectURL(files[0]);
                _this.setThumb(localURL);
                _this.$el.find(".own").removeClass("loading");
            });

        }
    }


});
module.exports = view;