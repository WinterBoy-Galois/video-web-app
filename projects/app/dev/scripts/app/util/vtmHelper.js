var vtm_vars = {
    'vtm_source': 'source',
    'vtm_campaign': 'name',
    'vtm_term': 'term',
    'vtm_medium': 'medium',
    'vtm_content': 'content'
};


var utmStorageKey = 'vp_utm_params';

/*
 * Get Object of URL Params
 */
function getURLParams() {
    try {
        var search = location.search.substring(1);
        return search ? JSON.parse('{"' + search.replace(/&/g, '","').replace(/=/g, '":"') + '"}',
            function(key, value) {
                return key === "" ? value : decodeURIComponent(value);
            }) : {};
    } catch (_) {
        return {};
    }
}

/*
 * Get campaign params from URL
 */
function getCampaignParamsFromURL() {
    var params = getURLParams(),
        result = {},
        key,
        val;
    for (key in vtm_vars) {
        val = vtm_vars[key];
        if (params[key])
            result[val] = params[key];
    }
    return result;
}

/*
 * Get previously stored params from storage
 */
function getCampaignParamsFromStorage() {
    try {
        return JSON.parse(localStorage.getItem(utmStorageKey)) ||  {};
    } catch (_) {
        return {};
    }
}

function setCampaignParamsToStorage(params) {
    try {
        if (params.name) {
            localStorage.setItem(utmStorageKey, JSON.stringify(params));
        }
    } catch (_) {}
}

function saveCampaignParamsToStorageFromURL() {
    var params = getCampaignParamsFromURL();
    setCampaignParamsToStorage(params);
}

/*
 * Always save params to storage if available
 */
saveCampaignParamsToStorageFromURL();

/*
 * Check Storage and URL for params
 */
function getValidCampaignParams()  {
    var urlParams = getCampaignParamsFromURL();
    if (urlParams.name) {
        return urlParams;
    }

    var storageParams = getCampaignParamsFromStorage();
    if (storageParams.name) {
        return storageParams;
    }
    return false;
}

module.exports = {getCampaignParams:getValidCampaignParams};
