var $ = require('jquery'),
    Controller = require('shared/controllers/controller'),
    View = require('./view');


// make sure that this only gets loaded once!
var loading = false;
var local_tiny_mce = null;

function loadTinyMCEIfNeeded() {
    if (loading) {
        return;
    }
    loading = true;
    $.getScript("//tinymce.cachefly.net/4.1/tinymce.min.js",
        function() {
            local_tiny_mce = window.tinymce;
        }
    );

}


module.exports = Controller.extend({

    editorOptions: {
        plugins: "link paste code",
        paste_as_text: true,
        menubar: false,
        statusbar: false,
        resize: false,
        height: 150,
        block_formats: "Paragraph=p;Header 1=h1;Header 2=h2;Header 3=h3",
        toolbar: "undo redo | bold italic | link | formatselect | bullist numlist heading formats | code removeformat"
    },

    buildRootView: function() {

        this.editorID = "vp_editor_" + Math.floor(Math.random() * 1000000);

        this.options.content.set({
            "_editorID": this.editorID
        });

        return new View({
            model: this.options.content
        });

    },

    onRootViewShow: function() {
        this.loadEditor();
    },

    loadEditor: function() {
        loadTinyMCEIfNeeded();

        // wait for script to become available
        var _this = this;
        this.loadInterval = setInterval(function() {
            if (local_tiny_mce !== null) {
                clearInterval(_this.loadInterval);
                _this.addEditor();
            }
        }, 200);

    },

    onDestroy: function() {
        clearInterval(this.loadInterval);
        clearInterval(this.dragEndTimeout);
    },

    addEditor: function() {

        // create editor with correct id
        this.editor = new local_tiny_mce.Editor(this.editorID, this.editorOptions, local_tiny_mce.EditorManager);
        this.editor.render();

        var _this = this;

        // set initial content after delay
        setTimeout(function() {
            var val = _this.options.content.get("text");
            if (val) {
                _this.editor.setContent(val);
            }
        }, 300);

        // react to editor changes
        this.editor.on("change", function() {
            _this.editor.save();
            _this.options.content.set({
                text: _this.editor.getContent()
            });
            _this.trigger("changed");
        });
    },

    // react to end of block dragging
    dragEnd: function() {
        var _this = this;
        this.dragEndTimeout = setTimeout(function() {
            _this.rootView.render();
            _this.addEditor();
        }, 300);

    }

});