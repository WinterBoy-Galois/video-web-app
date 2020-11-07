/*
 * Test components by accessing the demo video 
 */

var
    React = require('react'),
    ReactTestUtils = require('react-addons-test-utils'),

    FoundationComponents = require('../../../demo/comps/index.jsx');


describe('Foundation Components', function() {

        it("exists", function() {
            expect(FoundationComponents).to.exist;
        });

        it("can mount and unmount", function() {
            ReactTestUtils.renderIntoDocument(React.createElement(FoundationComponents));
        });
});
