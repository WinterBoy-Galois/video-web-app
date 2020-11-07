var _ = require('underscore'),
    Model = require('backbone').Model;

module.exports = Model.extend({

    defaults: {},

    children: {},


    /*
     *  Reset Model to defaults
     */
    reset: function() {
        this.clear({
            silent: true
        });
        this.set(this.defaults);
    },


    /*
     * URL fix to append trailing slashes to Model URLs
     */
    url: function() {
        var origUrl = Model.prototype.url.call(this);
        return origUrl + (origUrl.charAt(origUrl.length - 1) === '/' ? '' : '/');
    },

    urlRoot: 'some_url',

    /*
     *
     */
    set: function(json, arg1, arg2) {
    
        // set children automatically
        this.ensureChildren();
        var children = this.children;
        _.forEach(this.children, function(child, key) {
            if (json[key]) {
                var child = children[key];
                child.set(json[key], arg1);
                if (child.sort) {
                    child.sort();
                }
                json[key] = null;
            }
        });

        // call super
        Model.prototype.set.call(this, json, arg1, arg2);
    },

    /*
     * Add support for nested and dirty only saving
     */

    save: function(attributes, options) {

        options = options || {};

        if (!attributes) {
            attributes = undefined;
        }

        // run save on all children if requested
        if (options.nested) {
            _.forEach(this.children, function(child) {
                child.save(attributes, options);
            });
        }

        // only save dirty models if requested
        if (options.onlyDirty && !this.isDirty() && !this.isNew()) {
            return false;
        }

        // make sure model isn't dirty on success
        var _this = this;
        return Model.prototype.save.call(this, attributes, options).then(function(result) {
            _this.setDirty(false);
            return result;
        });

    },

    /*
     * Add support for keeping track staying in sync
     */
    initialize: function() {

        this.localID = Math.floor((Math.random() * 1000000000) + 1);

        // remember children
        this.ensureChildren();

        // setup support for syncing
        this.listenTo(this, 'change', function() {
            this.setDirty(true);
        });
        this.listenTo(this, 'sync', function() {
            this.setDirty(false);
        });

        this.setDirty(false);

    },

    setDirty: function(dirty, options) {
        options = options ||  {};
        if (options.nested) {
            _.each(this.children, function(item) {
                item.setDirty(dirty, options);
            });
        }
        this.dirty = dirty;
    },

    isDirty: function() {
        return this.dirty;
    },


    /*
     * Support for adding child models
     */
    addChild: function(child, name) {
        this.ensureChildren();
        child.owner = this;
        this[name] = child;
        this.children[name] = child;
        return child;
    },

    /*
     *  Creates children as specified in the children object
     */
    ensureChildren: function() {
        if (!this.childrenCreated) {
            this.childrenCreated = true;
            var childrenConf = this.children;
            this.children = {};
            var _this = this;
            _.forEach(childrenConf, function(cls, key) {
                _this.addChild(new cls(), key);
            });
        }
    }


});