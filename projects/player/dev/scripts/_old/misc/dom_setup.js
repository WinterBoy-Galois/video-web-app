var $ = require('jquery');


// disable drag and drop on whole player
$(document).bind({
    dragenter: function(e) {
        e.stopPropagation();
        e.preventDefault();
        var dt = e.originalEvent.dataTransfer;
        dt.effectAllowed = dt.dropEffect = 'none';
    },
    dragover: function(e) {
        e.stopPropagation();
        e.preventDefault();
        var dt = e.originalEvent.dataTransfer;
        dt.effectAllowed = dt.dropEffect = 'none';
    }
});