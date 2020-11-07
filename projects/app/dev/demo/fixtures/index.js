var _ = require('underscore'),
	User = require('sdk/models/user'),
	Profile = require('sdk/models/profile'),
	Integrations = require('sdk/models/integrations'),
	Teams = require('sdk/models/teams'),
	Team = require('sdk/models/team'),
	Videos = require('sdk/models/videos'),
	Video = require('sdk/models/video'),

	Subscription = require('sdk/models/user_subscription'),
	CreditCard = require('sdk/models/user_creditcard'),
	Invoices = require('sdk/models/invoices'),
	Address = require('sdk/models/user_address'),
	Plans = require('sdk/models/plans');

// convert json to model
var fix2model = function (Model, fixture) {
	var m = new Model();
	m.set(fixture);
	return m;
};

var fix2models = function(Model, fixture, keyAttribute) {

	var result = {};
	_.each(fixture, function(item){
		result[item[keyAttribute]] = fix2model(Model, item);
	});

	return result;
};

var fix2collection = function(Collection, fixture) {
	var c = new Collection();
	c.set(fixture);
	return c;
};

module.exports = {

	user: {
		free: fix2model(User, require('./user_free.json')),
		starter: fix2model(User, require('./user_starter.json')),
		pro: fix2model(User, require('./user_pro.json')),
		staff: fix2model(User, require('./user_staff.json')),
	},

    profile: {
        regular: fix2model(Profile, require('./profile.json'))
    },

	integrations: {
		none: new Integrations(require('./integrations_none.json')),
		some: new Integrations(require('./integrations_some.json'))
	},

	video: fix2models(Video,require('./videos_some.json'), 'id'),

	videos: {
		some: new Videos(require('./videos_some.json'))
	},

	revisions: {
		some: new Videos(require('./revisions_some.json'))
	},

	/*
     * Teams
     */
	team: fix2models(Team, require('./teams_some.json'), 'name'),

	teams: {
		one: new Teams(require('./teams_one.json')),
		some: new Teams(require('./teams_some.json'))
	},

	/*
	 * Billing, subscriptions..
	 */
	invoices: {
		none: new Invoices(),
		some: fix2collection(Invoices,require('./invoices_some.json'))
	},

	creditCard: {
		none: new CreditCard(),
		expired: new CreditCard(require('./creditcard_expired.json')),
		current: new CreditCard(require('./creditcard_current.json'))
	},

	subscription: {
		free: fix2model(Subscription,require('./subscription_free.json')),
		pro_renewing: fix2model(Subscription,require('./subscription_pro_plus_renewing.json')),
		pro_switching: fix2model(Subscription,require('./subscription_pro_plus_switching.json')),
		individual: fix2model(Subscription,require('./subscription_individual.json'))
	},

	address: {
		def: new Address()
	},

	plans: {
		def: fix2collection(Plans,require('./plans.json'))
	}

};
