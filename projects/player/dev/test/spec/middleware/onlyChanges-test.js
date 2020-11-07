var _ = require('underscore'),
	onlyChanges = require('middleware/onlyChanges'),

	mockAction = function(value){
		return {
			type:'some_type',
			value:value,
			meta: {
				$onlyChanges: true
			}
		};
	};


describe('Middleware: Only Changes', function() {

	it('should only be called when action args change', function() {
		var spy = sinon.spy();

		var dispatch = onlyChanges({})(spy);
		
		dispatch(mockAction(0));
		expect(spy.called).to.be.true;

		dispatch(mockAction(0));
		expect(spy.calledOnce).to.be.true;

		dispatch(mockAction(1));
		expect(spy.calledTwice).to.be.true;

		dispatch(mockAction(0));
		expect(spy.calledThrice).to.be.true;

	});

});

