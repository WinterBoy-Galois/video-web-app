var config = require('../config'),
    ajax = require('../util/ajax'),
    Collection = require('./_collection'),
    users = require('./users'),
    sdk = require('sdk'),
    Profile = require('./profile');

var Profiles = Collection.extend({
    model: Profile,
    url: function() {
        //var postFix = this.groupFilter ? '?group=' + this.groupFilter : '';
        return config.urls.profileURL;
    },

    /*
     * Manage sensitive changes
     */
    updateProfile: function(first_name,last_name,birthdate,gender,occupation,industry,industry_other,phone, tags) {
        return ajax.put({
            url: this.url(),
            data: {
                first_name: first_name,
                last_name: last_name,
                birthdate: birthdate,
                gender: gender,
                occupation: occupation,
                industry: industry,
                industry_other: industry_other,
                phone: phone,
                tags: tags
            }
        }).then(function() {
            user_model = users.getCurrentUser();
            profile = user_model.get('profile');
            profile.first_name = first_name;
            profile.last_name = last_name;
            profile.tags = tags;
            user_model.set('profile',profile);
            user_model.trigger('change');
        });
    }
});

module.exports = Profiles;
