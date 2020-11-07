var Controller = require('shared/controllers/controller'),
    View = require('./view');


module.exports = Controller.extend({

    views: {
        "rootView": {
            events: {
                "file_selected": function(file) {
                    this.startUpload(file);
                },
                "selected_align": function(align) {
                    this.options.content.set({
                        image_align: align
                    });
                    this.rootView.model.set({
                        image_align: align,
                    });
                    this.trigger("changed");
                }
            }
        }
    },

    buildRootView: function() {
        return new View();
    },

    onRootViewShow: function() {
        var image_url = this.options.content.get("image_url");
        var image_align = this.options.content.get("image_align");
        if (image_url) {
            this.rootView.model.set({
                state: "done",
                image_url: image_url,
                image_align: image_align
            });
        }
    },

    startUpload: function(file) {

        // do some stuff
        var _this = this;
        var success = function(result) {
            _this.rootView.model.set({
                state: "done",
                image_url: result.file_url
            });
            _this.options.content.set({
                image_url: result.file_url
            });
            _this.trigger("changed");
        };

        var progress = function(p) {
            var amount = Math.floor(p * 100);
            _this.rootView.model.set({
                uploadProgress: amount
            });
        };

        var failure = function() {
            _this.rootView.model.set({
                state: "start"
            });
            _this.trigger("changed");
        };

        this.options.content.originalContent.uploadImage(file).then(success, failure, progress);

        this.rootView.model.set({
            state: "uploading"
        });

    },

});