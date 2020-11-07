var sizeSelector = require('util/sizeSelector');

describe('Util: Size Selector', function() {

    it('should fall back to default', function() {

    	var data = [{
    		name:'first',
    		minHeight:500,
    		minWidth:500
    	},{
    		name:'default'
    	}];

    	var result = sizeSelector(data, 400,400);
        expect(result.name).to.equal('default');

    });

    it('should detect minwidth and minheight', function() {
    	
    	var data = [{
    		name:'first',
    		minHeight:500,
    		minWidth:500
    	},{
    		name:'default'
    	}];

        expect(sizeSelector(data, 400,400).name).to.equal('default');
        expect(sizeSelector(data, 500,500).name).to.equal('first');

    });

    it('should detect maxheight and maxwidth', function() {
    	
    	var data = [{
    		name:'first',
    		maxHeight:500,
    		maxWidth:500
    	},{
    		name:'default'
    	}];

        expect(sizeSelector(data, 400,400).name).to.equal('first');
        expect(sizeSelector(data, 505,505).name).to.equal('default');

    });

    it('should run from top to bottom', function() {
    	
    	var data = [

    	{
    		name:'first',
    		maxWidth:500,
    		maxHeight:500,
    	},
    	{
    		name:'second',
    		minWidth:200,
    		minHeight:200,
    	},
    	{
    		name:'third',
    		maxWidth: 800,
    		minHeight:200,
    	},
    	{
    		name:'default'
    	}];

        expect(sizeSelector(data, 40,40).name).to.equal('first');
        expect(sizeSelector(data, 600,600).name).to.equal('second');
        expect(sizeSelector(data, 40,600).name).to.equal('third');

        expect(sizeSelector(data, 1000,40).name).to.equal('default');
    });

});