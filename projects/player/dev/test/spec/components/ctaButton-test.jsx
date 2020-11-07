var React = require('react'),
	ReactDOM = require('react-dom'),
	TestUtils = require('react-addons-test-utils'),
	Button = require('components/ctaButton');

describe('Components: CTA Button', function() {

	it('can have a title', function() {
    	var spy = sinon.spy(),
    		button = TestUtils.renderIntoDocument(<Button title='test' />),
    		node = ReactDOM.findDOMNode(button);
		expect(node.textContent).to.equal('test');
    });

    it('can be clicked', function() {
    	var spy = sinon.spy(),
    		button = TestUtils.renderIntoDocument(<Button onClick={spy} />),
    		node = ReactDOM.findDOMNode(button);
		TestUtils.Simulate.click(node);
		expect(spy.called).to.be.true;
    });

});