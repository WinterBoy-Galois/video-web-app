module.exports = {
	progress:[0,0.2,0.4,0.6,0.8,1],
	buffer: [0,0.2,0.4,0.6,0.8,1],
	state:['ready', 'initializing', 'paused', 'playing', 'buffering', 'ended', 'error'],
	areControlsCollapsed:[false,true],
	isFullscreen:[false,true],
	volume:[1,0],
	currentMarker: [false, 0, 1, 2, 3],
	openedMarker: [false, 0, 1, 2, 3],
	isEndscreenShowing: [false, true]
};