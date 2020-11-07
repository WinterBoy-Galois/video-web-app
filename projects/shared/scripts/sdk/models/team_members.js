var config = require('../config'),
    Collection = require('./_collection'),
    TeamMember = require('./team_member');

var Integrations = Collection.extend({

    model: TeamMember,

    url: function() {
        return this.owner.url() + config.urls.nestedTeamMemberURL;
    },

    comparator: function(item) {
    	var level = 40;
    	if ( item.get('role') == 'admin' ) level = 30;
    	if ( item.get('role') == 'owner' ) level = 20;
        return [level, item.get("email")];
    },

    addUserByEmail: function(email) {

        var member = new TeamMember({
            'team': this.owner.get('id'),
            'email': email
        });

        var _this = this;
        return member.save().then(function(){
            _this.add(member);
        });

    }


});

module.exports = Integrations;