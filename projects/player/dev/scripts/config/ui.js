/*
 * Constants and configs for the UI
 */

module.exports = {

	colors: {
		darkblue: "#273a45",
		blue: "#32526e",
		lightblue: "#81b9c3",
		green: "#41c3ac",
		gray: "#c6c6c6",
		lightgray: "#f8f8f8",
		darkgray: "#888",
		orange: "#ff884d",
		red: "#ff6b57",
	},


	// map vertical space to marker size
	markerHeightSelector: [{
			name: 'normal',
			minHeight:700,
			minWidth:700,
		},{
			name: 'medium',
			minHeight:500,
			minWidth:500
		},{
			name: 'small',
			minHeight:350,
			minWidth:350
		},{
			name: 'tiny',
			minHeight:100,
			minWidth:100
		},{
			name: 'medium',
			showOnlyCurrentMarker: true,
		}],

	// definition of marker heights
	markerHeigths: {
		normal: 40,
		medium: 35,
		small: 30,
		tiny: 20
	},

	// what the size is for only displaying one marker
	smallestMarkersSize:250,

	overlaySizeSelector: [{
		name: 'normal',
		minWidth: 650
		}, {
		name: 'medium',
		minWidth: 550
		}, {
		name: 'small',
		}
	],

	// contentblock config
	contentBlocks: {
		website: {
			fullscreen:true,
			exclusive:true,
			maxWidth: 1024
		},
		social: {
			fullscreen: true,
			exclusive: true,
			maxWidth: 500
		},
		media: {

		},
		text: {

		},
		image: {

		},
		simple_button: {

		},
		email_collector: {

		}
	},

	overlayMaxWidth: 700,

	// play button
	playButtonSizeSelector: [{
			name:'normal',
			minHeight:768,
			minWidth:768
		},{
			name:'medium',
			minHeight:512,
			minWidth:512
		},{
			name:'small',
			minHeight:400,
			minWidth:400
		},{
			name:'tiny'
		}],

	//
	// endscreen
	//
	endscreenSizeSelector: [{
			name:'normal',
			minHeight:500,
			minWidth:500
		},{
			name:'medium',
			minHeight:400,
			minWidth:400
		},{
			name:'small',
		}],

	brandedMarkerColors: {
		backgroundColor: '#273a45',
		textColor: '#eee',
		outlineColor: '#32526e',

		activeBackgroundColor: '#32526e',
		activeTextColor:  '#eee',
		activeOutlineColor: '#273a45',
	}

	

	
	
};