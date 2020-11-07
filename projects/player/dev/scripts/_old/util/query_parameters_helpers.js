function parseQueryParameters(url) {
    var qparams = {},
        parts = (url || '').split('?'),
        qparts, qpart,
        i = 0;

    if (parts.length <= 1) {
        return qparams;
    }
    qparts = parts[1].split('&');
    for (i in qparts) {
        qpart = qparts[i].split('=');
        qparams[decodeURIComponent(qpart[0])] =
            decodeURIComponent(qpart[1] || '');
    }
    return qparams;
}

module.exports = {
    parseQueryParameters: parseQueryParameters,
};