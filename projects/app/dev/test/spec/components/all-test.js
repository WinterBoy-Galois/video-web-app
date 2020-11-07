var _ = require('underscore'),
    React = require('react'),
    ReactTestUtils = require('react-addons-test-utils');

var comps = {
    'AppPage': require('components/app_page'),
    'Button': require('components/button'),
    'Form: Form ': require('components/forms').Form,
    'Form: Input': require('components/forms').Form,
};


_.each(comps, function(comp, key) {

    describe('Component All: ' + key, function() {

        it("exists", function() {
            expect(comp).to.exist;
        });

        it("can mount and unmount", function() {
            ReactTestUtils.renderIntoDocument(React.createElement(comp));
        });

    });

});