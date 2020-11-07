var Backbone = require('backbone'),
    model_binder = require('shared/models/model_binder');


function create(sourceModel) {
    var vmodel = new Backbone.Model();

    // bind regular attributes
    model_binder.bind({

        "label": "title",

        "action": "target_url",

        // map colors to pre sets
        "color": {
            observe: "color",
            map: function(val) {
                // default value;
                val = val || 'green';
                switch (val) {
                    case "green":
                        return "#41c3ac";
                    case "red":
                        return "#ff6b57";
                    case "blue":
                        return "#32526e";
                    case "orange":
                        return "#ff884d";
                }

                return val;
            }
        }

    }, sourceModel, vmodel);

    return vmodel;
}

module.exports = {
    create: create
};