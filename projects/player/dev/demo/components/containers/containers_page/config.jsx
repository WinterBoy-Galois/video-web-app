
var _ = require('underscore'),
	fixtures = require('../../config/fixtures');


// pages
var settings = {
	
	// engine
	engine: {
		component: require('containers/videoEngine/component'),
		props: {
			source: fixtures.sources,
			fit: {
				'no': false,
				'yes': true
			}
		},

		controllComponent: require('./components/engine_controller')
	},

	controlsView: {
		component: require('containers/controls/play'),
		props: {
			theme: fixtures.colors,
			videoRevision: fixtures.revisions,
			backgroundImage: fixtures.bgImages
		},
		controllComponent: require('./components/redux_controller')
	},

	overlayView: {
		component: require('containers/markerOverlays/play/component'),
		props: {
			openedMarker: fixtures.overlays,
			backgroundImage: fixtures.bgImages,
			environment: fixtures.environment
		},
		controllComponent: require('./components/resize_controller')
	},

	brandedEndscreenView: {
		component: require('containers/endscreen/play/component'),
		props: {
			showing:[true],
			branded:[true],
		},
		controllComponent: require('./components/resize_controller')
	},

	regularEndscreenView: {
		component: require('containers/endscreen/play/component'),
		props: {
			showing:[true],
			branded:[false],
			backgroundColor:['#eee'],
			title: ["Las voces de Babbel | Políglota hablando 9 idiomas!"],
			subtitle: ["Aprende idiomas fácilmente"],
			buttonColor: ["#ff8d15"],
			buttonTitle: ["Prueba Babbel gratis"]
		},
		controllComponent: require('./components/resize_controller')
	},

	password: {
		component: require('containers/password'),
		props: {
			theme: fixtures.colors,
			videoRevision: fixtures.revisions,
			backgroundImage: fixtures.bgImages
		},
		controllComponent: require('./components/redux_controller')
	},

	error: {
		component: require('containers/error'),
		props: {
			theme: fixtures.colors,
			videoRevision: fixtures.revisions,
			backgroundImage: fixtures.bgImages
		},
		controllComponent: require('./components/redux_controller')
	},


	/*
	controls_build: {
		component: require('containers/controls/build/component'),
		props: {
			colors: fixtures.colors,
			videoRevision: fixtures.revisions,
			backgroundImage: fixtures.bgImages
		},
		callbacks: [
			'onTogglePlayClick',
			'onTogglePlayClick',
			'onProgressSelected',
			'onShareServiceSelected',
			'onVolumeToggleClick',
			'onFullscreenToggleClick'
		],
		controllComponent: require('./components/env_state_controller')
	},*/

	/*
	overlays_view: {
		component: require('containers/markerOverlays/play/component'),
	},

	overlays_build: {
		component: require('containers/markerOverlays/build/component'),
	},
	*/
	
	player: {
		component: require('mainContainers/player'),
		props: {
			videoRevision: fixtures.revisions,
		}
	},

};


// generate default props for object
_.each(settings, function(setting){
	setting.defaultProps = _.mapObject(setting.props, function(item){
		return _.keys(item)[0];
	});
});

module.exports = settings;