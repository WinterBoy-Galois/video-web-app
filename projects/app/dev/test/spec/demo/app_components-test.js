/*
 * Test components by accessing the demo video 
 */

var _ = require('underscore'),
    React = require('react'),
    ReactTestUtils = require('react-addons-test-utils'),

    config = require('../../../demo/app_components/config.jsx');

_.each(config, function(entry, key){


	describe('App Components: ' + key, function(){

		it("exists", function() {
            expect(entry.component).to.exist;
        });

        it("can mount and unmount with defaults", function() {
            ReactTestUtils.renderIntoDocument(React.createElement(entry.component, entry.defaultProps));
        });


        // find all iteratable props and test those
        _.each(entry.props, function( prop, propName ){

            if (_.isObject(prop)) {
                _.each(prop, function(value, key) {
                    var props = entry.defaultProps;
                    props[key] = value;
                    // props[key] = value;
                    it('can mount and unmount with ' + propName + ' set to: ' + key, function(){
                        ReactTestUtils.renderIntoDocument(React.createElement(entry.component, props));
                    });
                });
            }

        });

	});


});
