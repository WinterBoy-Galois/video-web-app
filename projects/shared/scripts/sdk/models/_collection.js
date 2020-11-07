var Collection = require('backbone').Collection,
    Model = require('./_model');

module.exports = Collection.extend({

    model: Model,

    /*
     *   modify json slightly to adapt to django rest framework output
     */
    parse: function(response) {
        if (response.results) {
            this.count = response.count;
            this.page_size = 20;
            return response.results;
        }
        return response;
    },

    /*
     * Clear and refresh collection
     */
    refresh: function() {
        return this.fetch({
            reset: true
        });
    },

    /*
     *   load model by ide
     */
    fetchById: function(id){
        var model = new this.model({
            id: id
        });
        return model.fetch().then(function() {
            return model;
        });
    },

    /*
     * Add support for keeping track staying in sync
     */
    initialize: function() {
        this.localID = Math.floor((Math.random() * 1000000000) + 1);
        this.listenTo(this, "sync", function() {
            this.each(function(item) {
                item.setDirty(false);
            });
        });
    },

    /*
     *   Save all items in collection
     */
    save: function(attrs, options) {
        this.forEach(function(item) {
            item.save(attrs, options);
        });
    },

    /*
     * Own create implementation
     */
    create: function(attributes) {
        var m = new this.model(attributes);
        var collection = this;
        return m.save().then(function() {
            collection.add(m);
            return m;
        });
    },

    /*
     *
     */
    setDirty: function(dirty, options) {
        this.each(function(item) {
            item.setDirty(dirty, options);
        });
    }


});