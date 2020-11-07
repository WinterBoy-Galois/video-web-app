q = require('querystring');

module.exports = function (content) {
    this.cacheable();
    var query = q.parse(this.query),
        context = query.enable || query['?enable'];

    if (context) {
        var re = new RegExp('//#' + context, 'g');
        return content.replace(re, '');
    } else {
        return content;
    }
};
