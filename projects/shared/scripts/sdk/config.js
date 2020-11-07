/*
 *  API Urls
 */
var config = {};

config.setEndpoint = function(endpoint) {

    // update all urls with new endpoint information
    config.urls = {

        //endpoint
        endpoint: endpoint,

        // users
        userURL: endpoint + 'user/me/',
        usersURL: endpoint + 'user/',
        apiTokenURL: endpoint + 'api-token/',
        resetPasswordURL: endpoint + 'user/me/password-reset',
        profileURL: endpoint + 'profile/',

        // videos
        videoURL: endpoint + 'video/',
        nestedVideoURL: 'video/',

        // integrations
        integrationURL: endpoint + 'integration/',
        nestedIntegrationURL: 'integration/',


        // teams
        teamURL: endpoint + 'team/',
        teamMemberURL: endpoint + 'team-member/',
        nestedTeamMemberURL: 'team-member/',

        // video revisions
        videoRevisionURL: endpoint + 'video-revision/',
        videoRevisionNestedURL: 'revision/',
        videoRevisionJPGSequence: 'source/jpg_sequence/',

        // markers
        markerURL: 'marker/',
        markerSingleURL: endpoint + 'marker/',
        markerContentURL: 'content/',
        markerContentSingleURL: endpoint + 'markercontent/',

        // video uploads (pending refactoring)
        uploadVideoTicketURL: endpoint + 'video/upload/requestticket/',
        uploadVideoCompleteURL: endpoint + 'video/upload/complete/',


        // thumbnail uploads (pending refactoring)
        uploadImageTicketURL: endpoint + 'image/upload/requestticket/',
        uploadImageCompleteURL: endpoint + 'image/upload/complete/',
        deleteCustomThumbsURL: endpoint + 'video/thumbs/{id}/delete_custom/',

        // invoices, plans, payments
        invoiceURL: endpoint + 'user/me/invoice/',
        addressURL: endpoint + 'user/me/address/',
        subscriptionURL: endpoint + 'user/me/subscription/',
        creditCardURL: endpoint + 'user/me/credit-card/',
        planURL: endpoint + 'plan/',

        // analytics
        analyticsDataURL: 'analytics-daily/',

        // stripe
        stripeSDKURL: 'https://js.stripe.com/v2/'

    };

};

/* 
 * Constants
 */
config.c = {

    plans: {
        freeGroup: 'free',
        individualGroup: 'individual'
    },

    stripe: {
        apiKey: ''
    },

    defaultEndpoint: 'http://localhost:8000/v1/',
};


/*
 * Strings
 */
config.strings = {

    apiNotReachable: "API not reachable. Please try again later.",
    apiRequestFailed: "Request Failed."

};

/*
 * Stripe Key
 */
config.setStripePublicKey = function(key) {
    config.stripePublicKey = key;
};

// set default endpoints
config.setEndpoint(config.c.defaultEndpoint);


module.exports = config;
