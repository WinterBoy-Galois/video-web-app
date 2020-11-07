var config = require('../config'),
    Collection = require('./_collection'),
    Content = require('./marker_content');

var Contents = Collection.extend({
    model: Content,

    url: function() {
        return this.owner.url() + config.urls.markerContentURL;
    },

    comparator: function(item) {
        return item.get("ordinal");
    },

    create: function(attributes, options) {

    	// fill in owner attribute
    	attributes = attributes || {};

    	// try to set the marker attribute
    	if ( this.owner ) {
    		attributes.marker = this.owner.get('id');
    	}

    	// insert at correct index
    	// shift sibling accordingly
    	if ( options && options.index >= 0) {
    		var index = options.index;
    		if (index > this.length) {
	            index = this.length;
	        }
	       	attributes.ordinal = index;
	       	// shift ordinal of content after index
	        var count = 0;
	        this.each(function(c) {
	            if (count === index) {
	                count++;
	            }
	            c.set({
	                ordinal: count
	            });
	            count++;
	        });
    	}
    	   
        var content = new Content(attributes);
        var collection = this;
        return content.save().then(function(){
            collection.add(content);
            collection.sort();
            collection.save(false, {
                nested:true,
                onlyDirty:true
            });
            return content;
        });
    }

});

module.exports = Contents;