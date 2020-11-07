var ModalService = require('services/modal/service'),
    MainLayout = require('views/style-guide/main'),
    TypoView = require('views/style-guide/chapters/typography'),
    IconsView = require('views/style-guide/chapters/icons'),
    ButtonsView = require('views/style-guide/chapters/buttons'),
    InteractionsView = require('views/style-guide/chapters/interactions'),
    FormsView = require('views/style-guide/chapters/forms'),
    ModalsView = require('views/style-guide/chapters/modals');

require('behaviors');


var layout = new MainLayout();
layout.render();

layout.typo.show(new TypoView());
layout.buttons.show(new ButtonsView());
layout.icons.show(new IconsView());
layout.interactions.show(new InteractionsView());
layout.forms.show(new FormsView());
layout.modals.show(new ModalsView());

ModalService.setModalRegion(layout.modalContainer);

module.exports = {
    initialize: function() {
        layout.$el.appendTo(document.body);
    }
};