var _ = require('underscore'),
    Backbone = require('backbone');


// bind one input model to an output model
function bind(config, srcModel, targetModel, context) {

    // setup vars
    targetModel = targetModel || new Backbone.Model();

    context = context || targetModel;

    // expand config
    config = expandConfig(config);

    // bind attributes
    _.each(config, function(val) {
        bindAttribute(val, context, srcModel, targetModel);
    });

    // return result
    return targetModel;
}

// bind multiple models into one target model
function multiBind(config, targetModel, context) {

    targetModel = targetModel || new Backbone.Model();
    context = context || targetModel;

    // list of input models
    var models = config._models;
    delete config._models;

    //expand config 
    config = expandConfig(config);

    // collect all values we need to observe
    var observables = {};
    _.each(config, function(value) {
        _.each(value.observe, function(entry) {
            observables[entry] = true;
        });
    });

    // map all observable values to an intermediate model
    // with scopes in place
    var intermediateModel = new Backbone.Model();
    _.each(observables, function(value, key) {
        var splitKey = key.split(".");
        var model = models[splitKey[0]];
        var attribute = splitKey[1];

        function update() {
            intermediateModel.set(key, model.get(attribute));
        }

        context.listenTo(model, "change:" + attribute, function() {
            update();
        });
        update();

    });

    // regular bind to intermediate model
    return bind(config, intermediateModel, targetModel, context);
}

// expand shortcute in config into full blown
// configuration, also adds defaults
function expandConfig(config) {
    var expanded = {};

    _.each(config, function(value, key) {

        var entry = {
            target: key,
            map: defaultMappingFunction
        };

        // string values shortcut
        if (typeof value === "string") {
            entry.observe = value;
        }

        // other object
        else {
            entry = _.extend(entry, value);
        }

        // transform observe strings to array
        if (typeof entry.observe === "string") {
            entry.observe = [entry.observe];
        }

        expanded[key] = entry;

    });

    return expanded;
}


// default implementations
function defaultMappingFunction(src) {
    return src;
}

function defaultUpdateFunction(targetModel, targetValue, srcModel, targetAttribute) {
    targetModel.set(targetAttribute, targetValue);
}

function buildEvents(attrs) {

    if (!attrs) {
        return;
    }
    return "change:" + _.reduce(attrs, function(memo, val) {
        return (memo || "") + " change:" + val;
    });
}

function bindAttribute(config, context, srcModel, targetModel) {

    var events = buildEvents(config.observe);

    function binding() {

        // get the src values
        var srcValues = _.map(config.observe, function(val) {
            return srcModel.get(val);
        });


        var targetAttribute = config.target;
        if (!config.update) {
            // map the value
            var targetValue = config.map.apply(this, srcValues);
            defaultUpdateFunction(targetModel, targetValue, srcModel, targetAttribute);
        } else {
            config.update(targetModel, srcValues, srcModel, targetAttribute);
        }

    }

    context.listenTo(srcModel, events, function() {
        binding();
    });
    binding();

}

module.exports = {
    bind: bind,
    multiBind: multiBind
};