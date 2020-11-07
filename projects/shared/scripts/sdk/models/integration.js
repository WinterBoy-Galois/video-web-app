var config = require('../config'),
    Model = require('./_model'),
    ajax = require('../util/ajax'),
    Collection = require('./_collection');

var Lists = Collection.extend({
    url: function() {
        return this.owner.url() + 'list/';   
    },
});

var Marker = Model.extend({

    defaults: {
        time: 0
    },

    children: {
        lists: Lists
    },

    initialize: function() {
        Model.prototype.initialize.call(this);
    },

    remove: function() {
    	var _this = this;
    	return ajax.del({
	        url: this.url()
	    }).then(function(){
	    	return _this.fetch();
	    });
    },

    urlRoot: function() {
        return this.collection.url();
    },

    connectWithCredentials: function(vals) {
        this.set('authorize', vals);
        return this.save();
    }


});

module.exports = Marker;