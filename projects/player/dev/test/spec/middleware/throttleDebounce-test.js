var _ = require('underscore'),
	onlyChanges = require('middleware/throttleDebounce'),

	throttledAction = function(){
		return {
			type:'some_type',
			meta: {
				$throttle: 5
			}
		};
	},

	debouncedAction = function(){
		return {
			type:'some_type',
			meta: {
				$debounce: 5
			}
		};
	};


describe('Middleware: Only Changes', function() {

	it('should throttle actions', function(done) {
		var spy = sinon.spy();
		var dispatch = onlyChanges({})(spy);

		dispatch(throttledAction());
		dispatch(throttledAction());
		expect(spy.calledOnce).to.be.true;

		setTimeout(function(){
			expect(spy.calledTwice).to.be.true;
			done();
		},10);

	});

	it('should debounce actions', function(done) {
		var spy = sinon.spy();
		var dispatch = onlyChanges({})(spy);

		dispatch(debouncedAction());
		dispatch(debouncedAction());
		expect(spy.called).to.be.false;

		setTimeout(function(){
			expect(spy.calledOnce).to.be.true;
			done();
		},10);

	});

});

