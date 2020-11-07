var config = require('../config'),
    Collection = require('./_collection'),
    Team = require('./team');

var Integrations = Collection.extend({

    model: Team,

    url: function() {
        return config.urls.teamURL;
    },

    comparator: function(item) {

    	var level = 40;
    	if ( item.get('role') == 'admin' ) level = 30;
    	if ( item.get('role') == 'owner' ) level = 20;

        return [level, item.get("name")];
    },
 
});

var create_with_result = function(name, description) {
    return ajax.post({
        url: config.urls.teamURL,
        data: {
            name: name,
            description: description,
       }
    }).then(function(result) {
       return result.id; 
   });
};


module.exports = Integrations;
