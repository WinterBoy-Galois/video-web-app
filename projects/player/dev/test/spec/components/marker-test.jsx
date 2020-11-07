var React = require('react'),
	ReactDOM = require('react-dom'),
	TestUtils = require('react-addons-test-utils'),
	Marker = require('components/marker');

describe('Components: Marker', function() {

	it('can have a title', function() {
    	var spy = sinon.spy(),
    		marker = TestUtils.renderIntoDocument(<Marker title='test' />),
    		node = ReactDOM.findDOMNode(marker);
		expect(node.textContent).to.equal('test');
    });

    it('can be clicked', function() {
    	var spy = sinon.spy(),
    		marker = TestUtils.renderIntoDocument(<Marker onClick={spy} />),
    		node = ReactDOM.findDOMNode(marker);
		TestUtils.Simulate.click(node);
		expect(spy.called).to.be.true;
    });

});