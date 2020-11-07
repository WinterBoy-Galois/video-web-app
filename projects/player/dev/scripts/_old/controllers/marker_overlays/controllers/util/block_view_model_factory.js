var _ = require('underscore'),
    Backbone = require('backbone'),
    model_binder = require('shared/models/model_binder');


var regular_attributes = {
    "text": "text",
    "url": "url",
    "image_url": "image_url",
    "id": "id",
    "key": "key",
    "video_key": "video_key",
};

var data_attributes = {
    "original_url": "original_url",
    "title": "title",
    "color": "color",
    "target_url": "target_url",
    "service": "service",
    "service_id": "service_id",
    "image_align": "image_align",
    "zoom": "zoom",
    "lat": "lat",
    "lng": "lng",
    "autoplay": "autoplay"
    //"id": "id"
};

function create(model) {

    var vmodel = new Backbone.Model();
    vmodel.originalContent = model;

    // unwrap and listen to the data attribute
    // on the model, needs some custom code
    var dataModel = new Backbone.Model();

    // transfer the regular attributes
    model_binder.bind(regular_attributes, model, vmodel);

    // always update data model when data dict changes
    vmodel.listenTo(model, "change:data", function() {
        var data = model.get("data");
        try {

            // set changed data
            var dataDict = JSON.parse(data);
            dataModel.set(dataDict);

        } catch (ignore) {}
    });
    model.trigger("change:data");

    // bind data dict model
    model_binder.bind(data_attributes, dataModel, vmodel);

    return vmodel;
}

function revert(model, viewmodel) {

    // revert data attributes back
    var dataChanges = {};
    _.each(data_attributes, function(value, key) {
        dataChanges[value] = viewmodel.get(key);
    });

    model.set({
        data: JSON.stringify(dataChanges)
    });

    // revert regular attributes back
    var regularChanges = {};
    _.each(regular_attributes, function(value, key) {
        regularChanges[value] = viewmodel.get(key);
    });
    model.set(regularChanges);
}

module.exports = {
    create: create,
    revert: revert,
};