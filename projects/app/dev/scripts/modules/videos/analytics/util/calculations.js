var config = require('config/analytics'),
    _ = require('underscore'),
    moment = require('moment'),
    numeral = require('numeral');

// prepare some values
var incrementalAttributes = _.keys(_.pick(config.attrs, function(entry){return entry.type =='incremental';})),
    averagingAttributes = _.keys(_.pick(config.attrs, function(entry){return entry.type =='averaging';})),
    calculatedAttributes = _.keys(_.pick(config.attrs, function(entry){return entry.type =='calulated';})),

    defaults = _.mapObject(config.attrs, function(item){return item.defaultValue;}),
    markerDefaults = {
        name:'Marker',
        unique:0,
        total:0
    },
    
    averagingWeightAttribute = "plays_all",

    apiDateFormat = 'YYYY-MM-DD';


function prepareEntry(entry) {

    // format according to format settings in config
    _.each(entry, function(value,key){
        var conf = config.attrs[key],
            f = conf&&conf.format;
        if (f) {
            entry[key+'_formatted'] = numeral(value||0).format(f) + (conf.formatSuffix ? conf.formatSuffix : '');
        }
    });

    if ( entry.popular_markers ) {
        entry.popular_markers = _.sortBy(entry.popular_markers, function(item){return  -item.total;});
    }
    return entry;
};

/* 
 *  Reduce a list of items into a single value
 *  Needs to take into account, that some values are also averaging
 *  and not incremental. These also need to be weighted by the plays 
 *  attribute.
 */
function reduceResults(results, excludeMarkers) {

    var totalWeight = 0;
    var result = _.reduce(results, function(memo, object) {

        // aggregate incremental attrs
        _.each(incrementalAttributes, function(val) {
            memo[val] += object[val];
        });

        // increment averaging attributes weighted
        var weight = object[averagingWeightAttribute];
        totalWeight += weight;
        _.each(averagingAttributes, function(val) {
            memo[val] += (object[val] * weight);
        });

        // merge marker stats
        if (!excludeMarkers) {
            memo.popular_markers = memo.popular_markers || {};
            _.each(object.popular_markers, function(value, key) {
                memo.popular_markers[key] = memo.popular_markers[key] || _.clone(markerDefaults);
                memo.popular_markers[key].unique += parseInt(value.unique) ||  0;
                memo.popular_markers[key].total += parseInt(value.total) || 0;
                memo.popular_markers[key].name = value.name;
            });
        }

        return memo;
    }, _.clone(defaults));


    // calculate average of
    // certain stats
    if (totalWeight) {
        _.each(averagingAttributes, function(val) {
            result[val] /= totalWeight;
        });
    }
    return result;
}


/*
 *  For now our api only reports items that have metrics in them
 *  To be able to show a clean graph, we need to add the missing
 *  items.
 */
function addIntermediateEntries(data, start, end) {

    var results = [];
        index = 0,
        missing= 0;

    for (var cur = moment.utc(start);cur.diff(end) <= 0; cur = cur.add(1, "day")) {
        if (index < data.length && Math.abs(cur.diff(data[index].date, "hours")) < 11) {
            results.push(data[index]);
            index++;
        } else {
            missing++;
            results.push(_.defaults({
                date: cur.format('YYYY-MM-DD'),
            }, defaults));
        }      
    }

    return results;
}

// in certain cases group chart data into bigger blocks
function groupEntries(data, group) {

    var groups = config.groups;

    group = groups[group];

    // group by pre-selected group
    var grouped = _.groupBy(data, function(object) {
        return moment(object.date,apiDateFormat).format(group.sort);
    });

    // reduce and re-inject date
    data = _.map(grouped, function(value,key){
        var result = reduceResults(value,true);
        result.dateFormattedShort = moment(key,group.sort).format(group.dateFormattedShort);
        result.dateFormattedLong = moment(key,group.sort).format(group.dateFormattedLong);
        return result;
    });

    return data;
}

/*
 *  Calculate list of entries for our chart from results
 */
function calculateChartData(results, start, end, grouping) {


    // add missing entries
    results = addIntermediateEntries(results, start, end);

    // group by group parameter
    results = groupEntries(results, grouping);

    // format and return
    return _.map(results, prepareEntry);
};

function calculateTotalData(results) {
    return prepareEntry(reduceResults(results));
};


module.exports = {
    calculateChartData: calculateChartData,
    calculateTotalData: calculateTotalData,
    defaultData: prepareEntry(defaults)
};