/*
 * Test components by accessing the demo video 
 */

var _ = require('underscore'),
	React = require('react'),
    ReactTestUtils = require('react-addons-test-utils'),

    pages = require('../../../demo/components/containers/components_page/page')._pages;


_.each(pages, function(Page,key){
	describe('Components pages' + key, function() {

        it("exists", function() {
            expect(Page).to.exist;
        });

        it("can mount and unmount", function() {
            ReactTestUtils.renderIntoDocument(<Page />);
        });
	});
});

