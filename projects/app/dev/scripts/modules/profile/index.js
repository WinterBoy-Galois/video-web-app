var analytics = require('analytics'),
    BaseModule = require('../module'),
    React = require('react'),

    sdk = require('sdk'),

    // components
    ProfileComponent = require('./components/profile');

module.exports = BaseModule.extend({
    appRoutes: {
        "profile/:pid": function(pid) {
            var _this = this;
            sdk.profiles.fetchById(pid).then(function(profile) {
                _this.setComponent(ProfileComponent, {
                    profile:profile,
                    user:sdk.currentUser
                });
            });
        }
    }

});
