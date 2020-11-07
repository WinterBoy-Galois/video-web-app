var Marionette = require('marionette'),
    template = require('./main.html');


module.exports = Marionette.LayoutView.extend({
    template: template,

    regions: {
        modalContainer: '#sg_modal_container',
        typo: '#chapter_typography .sg_chapter_content',
        buttons: '#chapter_buttons .sg_chapter_content',
        icons: '#chapter_icons .sg_chapter_content',
        interactions: '#chapter_interactions .sg_chapter_content',
        forms: '#chapter_forms .sg_chapter_content',
        modals: '#chapter_modals .sg_chapter_content'
    },

    behaviors: {
        DropdownMenu: {}
    }
});