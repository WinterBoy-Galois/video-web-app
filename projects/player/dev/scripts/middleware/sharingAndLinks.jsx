
var constants = require('const'),
	sharingHelper = require('util/sharingHelper');


var sharing = function(store) {
	return function(next) {
		return function(action) {

			// video shares
			if ( action.type === constants.ACTIONS.SHARE_VIDEO) {
				var url = '//player.videopath.com/' + store.getState().videoRevision.key;
				sharingHelper.share(url, action.service);
			}

			// endscreen cta
			else if ( action.type === constants.ACTIONS.ENDSCREEN_CTA_CLICK) {
				var ctaURL = store.getState().videoRevision.endscreen_button_target;
				window.open(ctaURL);
			}

			// content block cta
			else if ( action.type === constants.ACTIONS.CTA_CLICK) {
				window.open(action.url);
			}

			else if ( action.type === constants.ACTIONS.ICON_CLICK ) {
				var target = store.getState().videoRevision.ui_icon_link_target;
				if ( target ) window.open(target);
			}


			return next(action);
		};
	};
};

module.exports = sharing;
