var React = require('react'),
	ReactDOM = require('react-dom'),
	TestUtils = require('react-addons-test-utils'),
	Button = require('components/controlButton');

describe('Components: ControlButton', function() {

    it('can be clicked', function() {
    	var spy = sinon.spy(),
    		button = TestUtils.renderIntoDocument(<Button onClick={spy} />),
    		node = ReactDOM.findDOMNode(button);
		TestUtils.Simulate.click(node);
		expect(spy.called).to.be.true;
    });

});