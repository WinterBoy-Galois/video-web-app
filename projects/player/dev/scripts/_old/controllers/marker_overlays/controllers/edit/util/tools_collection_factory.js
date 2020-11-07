var _ = require('underscore'),
    Backbone = require('backbone'),
    model_binder = require('shared/models/model_binder'),
    content_config = require('../../content_config');


function create(overlayState) {


    // create tools collection
    var Collection = Backbone.Collection.extend({
        comparator: function(item) {
            return item.get("ordinal");
        }
    });

    var tools = new Collection();

    _.each(content_config, function(val) {

        try {
            if (val.requiresFeature && !window.parent.videopath_app.sdk.currentTeam.canUseFeature(val.requiresFeature) ) {
                return;
            }
        } catch(e) {}


        // create model for each tool
        var model = new Backbone.Model({
            ordinal: val.ordinal,
            id: val.id,
            type: val.id,
            tooltip: val.tooltip,
            exclusive: val.exclusive,
            disabled_tooltip: val.disabled_tooltip
        });
        tools.push(model);

        // bind to state
        // bind regular attributes
        model_binder.bind({

            "disabled": {
                observe: ["hasExclusiveContent", "numberOfBlocks"],
                map: function(hasExclusiveContent, numberOfBlocks) {
                    return hasExclusiveContent || (numberOfBlocks > 0 && !!val.exclusive);
                }
            }


        }, overlayState, model);


    });
    tools.sort();

    return tools;
}

module.exports = {
    create: create
};