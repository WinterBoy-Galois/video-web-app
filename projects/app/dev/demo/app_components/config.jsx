
var _ = require('underscore'),
	fixtures = require('./../fixtures');

// ops to fill in for component instances
var ops = {
	noop: function(){return false;},
	noopReject: function(){},
	noopResolve: function(){}
};

// pages

var settings = {


	// modals
	welcome_modal: {
		component: require('modals/welcome'),
		props: {
			team: fixtures.team, 
		}
	},

	video_modal: {
		component: require('modals/video'),
		props: {

			videoKey: {
				tutorial: 'orJG3pf351o',
				anna_cooking: 'a5_0-bFK4uE',
			},
		}
	},

	create_video_modal: {
		component: require('modals/create_video'),
		props: {
			team: fixtures.team, 
			user: fixtures.user,
			integrations: fixtures.integrations
		}
	},


	/*
	 * App
	 */
	navbar: {
		component: require('app/components/navbar'),
		props: {
			teams: fixtures.teams, 
			user: fixtures.user,
		}
	},

	/*
	 * Login Module
	 */
	login_page: {
		component: require('modules/login/components/login')
	},

	signup_page: {
		component: require('modules/login/components/signup')
	},

	forgot_password_page: {
		component: require('modules/login/components/forgot_password')
	},

	/*
	 * Videos Module
	 */
	history_page: {
		component: require('modules/videos/history'),
		props: {
			video: fixtures.video, 
			revisions: fixtures.revisions
		}
	},

	analytics_page: {
		component: require('modules/videos/analytics'),
		props: {
			video: fixtures.video,
			revision: fixtures.revisions
		},
	},

	/*
	 * Teams module
	 */
	teams_teams: {
		component: require('modules/teams/teams'),
		props: {
			teams: fixtures.teams
		}
	},

	teams_team: {
		component: require('modules/teams/team'),
		props: {
			team: fixtures.team,
			members: fixtures.team_members
		}
	},

	/*
	 *	Settings Module
	 */
	settings_account: {
		component: require('modules/settings/components/account'),
		props: {
			user: fixtures.user,
            profile: fixtures.profile,
		}
	},

	settings_billing: {
		component: require('modules/settings/components/billing'),
		props: {
			invoices: fixtures.invoices,
			card: fixtures.creditCard,
			subscription: fixtures.subscription,
			address: fixtures.address,
		}
	},

	settings_card: {
		component: require('modules/settings/components/card'),
		props: {
			card: fixtures.creditCard,
		}
	},

	settings_plans: {
		component: require('modules/settings/components/plans'),
		props: {
			subscription: fixtures.subscription,
			plans: fixtures.plans
		}
	},

	settings_address: {
		component: require('modules/settings/components/address'),
		props: {
			address: fixtures.address,
		}
	},


};


// generate default props for object
_.each(settings, function(setting){
	setting.defaultProps = _.mapObject(setting.props, function(item){
		if (_.isObject(item)) return _.values(item)[0];
		return item;
	});
});

module.exports = settings;
