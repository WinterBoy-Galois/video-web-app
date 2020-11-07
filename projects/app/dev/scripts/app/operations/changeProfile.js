/*
 *	
 */
var s = require('strings')('ops.change_profile'),
    operations = require('./');

/*
 *	Setup config
 */

var config = {
    successToast: s('success')
};


/*
 * Actual code goes here
 */
function run(ctx, opts) {
    var first_name = opts.first_name,
        last_name = opts.last_name,
        birthdate = opts.birthdate,
        gender = opts.gender,
        occupation = opts.occupation,
        industry = opts.industry,
        industry_other = opts.industry_other,
        phone = (typeof opts.phone !== 'undefined') ? opts.phone : "",
        tags = opts.tags;

    return ctx.sdk.profiles.updateProfile(first_name,last_name,birthdate,gender,occupation,industry,industry_other, phone, tags).fail(function(result) {
        if (result.detail)
            ctx.toasts.error(result.detail);
        return result;
    });

}

module.exports = operations.wrap(run, config);
