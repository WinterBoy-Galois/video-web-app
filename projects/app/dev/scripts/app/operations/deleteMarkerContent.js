/*
 *	
 */
var s = require('strings')('ops.delete_marker_content'),
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
    var content = opts.content;
    return content.destroy({
        wait: true
    });
}

module.exports = operations.wrap(run, config);