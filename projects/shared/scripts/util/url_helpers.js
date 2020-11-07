var EMAIL_PATTERN = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
    URL_PREFIX_PATTERN = /^(http|ftp)s{0,1}:\/\//i,
    URL_VALIDATION_PATTERN = /\S\.\S\S/,

    HTTP_PREFIX = 'http://',
    MAILTO_PREFIX = 'mailto:',

    GOOGLE_FONTS_API_BASE_URL = '//fonts.googleapis.com/css',
    GOOGLE_FONTS_API_FAMILY_PARAM = 'family=';


function isEmail(str) {
    return EMAIL_PATTERN.test(str.trim());
}

function hasURLPrefix(str) {
    return URL_PREFIX_PATTERN.test(str.trim());
}

function isEmailAction(str) {
    return str.indexOf(MAILTO_PREFIX) === 0;
}

function prependEmailPrefix(str) {
    str = str.trim();
    if (isEmailAction(str)) {
        return str;
    } else {
        return MAILTO_PREFIX + str;
    }
}

function prependURLPrefix(str) {
    str = str.trim();
    if (hasURLPrefix(str)) {
        return str;
    } else {
        return HTTP_PREFIX + str;
    }
}

function processURLInput(str) {
    str = str.trim();
    if (isEmailAction(str) || hasURLPrefix(str)) {
        return str;
    }
    if (isEmail(str)) {
        return prependEmailPrefix(str);
    } else {
        return prependURLPrefix(str);
    }
}

function isValidURL(str) {
    return URL_VALIDATION_PATTERN.test(str.trim());
}

function checkValidGoogleFontsUrl(url) {
    return (url &&
        typeof url === "string" &&
        url.indexOf(GOOGLE_FONTS_API_BASE_URL) >= 0 &&
        url.indexOf(GOOGLE_FONTS_API_FAMILY_PARAM) >= 0) ? url : '';
}


// Google Fonts specific url handler

function parseFontFamilyFromGoogleFontsUrl(url) {
    if (!checkValidGoogleFontsUrl(url)) {
        return "''";
    }

    var nameStr = url.match(/family=(.*?)(&|$)/)[1];

    return nameStr.split('|').map(function(s) {
        return s.match(/^(.*?)(:|$)/)[1].split('+');
    }).map(function(words) {
        return "'" + words.join(' ') + "'";
    }).join(", ");
}


module.exports = {
    isEmail: isEmail,
    isEmailAction: isEmailAction,
    hasURLPrefix: hasURLPrefix,
    prependURLPrefix: prependURLPrefix,
    prependEmailPrefix: prependEmailPrefix,
    processURLInput: processURLInput,
    isValidURL: isValidURL,
    parseFontFamilyFromGoogleFontsUrl: parseFontFamilyFromGoogleFontsUrl,
    checkValidGoogleFontsUrl: checkValidGoogleFontsUrl
};