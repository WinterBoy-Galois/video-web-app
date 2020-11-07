var $ = require('jquery');


//var MIN_FONTSIZE = 12;


function loadCss(styleUrl) {
    var d = new $.Deferred();
    if (document.createStyleSheet) {
        document.createStyleSheet(styleUrl);
        d.resolve();
    } else {
        var link = $("<link rel='stylesheet' href='" + styleUrl + "' type='text/css' media='screen' />");
        link.on('load', function() {
            d.resolve();
        });
        $("head").append(link);
    }
    // resolve after timeout
    setTimeout(function() {
        d.resolve();
    }, 100);
    return d.promise();
}


function resizeFontToFit($el, maxWidth) {
    if (maxWidth) {

        $el.css({
            'display': 'inline-block',
            'position': 'absolute',
            'visibility': 'hidden',
            'font-size': ''
        });

        var width = $el.outerWidth();
        if (width > maxWidth) {
            var ration = maxWidth / width,
                fontsize = parseInt($el.css('font-size')),
                newsize = Math.floor(fontsize * ration);

            $el.css('font-size', newsize + 'px');
        }

        $el.css({
            'display': '',
            'position': '',
            'visibility': '',
        });
    }
}

module.exports = {
    resizeFontToFit: resizeFontToFit,
    loadCss: loadCss
};