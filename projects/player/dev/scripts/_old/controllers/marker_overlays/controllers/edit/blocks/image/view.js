var $ = require('jquery'),
    Backbone = require('backbone'),
    Marionette = require('marionette'),
    template = require('./view.html');


var viewModel = Backbone.Model.extend({

    defaults: {
        state: "start",
        uploadProgress: 0
    },

    states: {
        START: "start",
        UPLOADING: "uploading",
        DONE: "done"
    }

});

module.exports = Marionette.LayoutView.extend({

    template: template,
    className: "vp_image",

    ui: {
        start: ".vp_start",
        uploading: ".vp_uploading",
        done: ".vp_done",
        progress: ".vp_progress_inner",
        image: "img",
        input: "input"
    },

    bindings: {
        ":el": {
            observe: "state",
            update: function($el, val) {
                this.ui.start.toggleClass("vp_removed", val !== this.model.states.START);
                this.ui.uploading.toggleClass("vp_removed", val !== this.model.states.UPLOADING);
                this.ui.done.toggleClass("vp_removed", val !== this.model.states.DONE);
            }
        },
        ".vp_progress_inner": {
            observe: "uploadProgress",
            update: function($el, val) {
                $el.css("width", val + "%");
            }
        },
        "img": {
            observe: "image_url",
            update: function($el, val) {
                $el.attr("src", val);

            }
        },
        ".vp_done": {
            observe: "image_align",
            update: function($el, val) {
                $el.css("text-align", val);
            }
        }
    },

    behaviors: {
        Stickit: {},
        SelfTest: {},
    },

    events: {

        // file select by click
        "click .vp_start": "onUploadClicked",
        "change input": "onFileSelected",

        // dropzone
        "dragover .vp_start": "onDragOver",
        "dragenter .vp_start": "onDragEnter",
        "drop .vp_start": "onDrop",

        "click .vp_align": "onAlignClick"

    },

    initialize: function() {
        this.model = new viewModel();
    },

    onUploadClicked: function() {
        // open file field
        this.ui.input[0].click();
    },

    onFileSelected: function() {
        var files = this.ui.input[0].files;
        if (files.length > 0) {
            this.sendFileSelection(files[0]);
        }
    },

    onAlignClick: function(e) {
        var align = $(e.currentTarget).data().align;
        this.trigger("selected_align", align);
    },

    // dropzone
    onDragOver: function(e) {
        e.preventDefault();
        e.stopPropagation();
        this.ui.start.removeClass("vp_over");
    },

    onDragEnter: function(e) {
        e.preventDefault();
        e.stopPropagation();
        this.ui.start.addClass("vp_over");
    },

    onDrop: function(e) {
        e.preventDefault();
        e.stopPropagation();

        var _this = this;
        if (e.originalEvent.dataTransfer) {
            if (e.originalEvent.dataTransfer.files.length) {
                var file = e.originalEvent.dataTransfer.files[0];
                _this.sendFileSelection(file);

            }
        }
    },

    sendFileSelection: function(file) {
        this.trigger("file_selected", file);
    }

});