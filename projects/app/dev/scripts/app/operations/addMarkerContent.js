/*
 *	
 */
var s = require('strings')('ops.add_marker_content'),
    operations = require('./');

/*
 *	Setup config
 */

var config = {
    failureToast: s('failure'),
    successToast: s('success')
};


/*
 * Actual code goes here
 */
function run(ctx, opts) {
    var marker = opts.marker,
        position = opts.position,
        type = opts.type;

    return marker.contents.create({
        type: type
    }, {
        index: position
    });
}

module.exports = operations.wrap(run, config);