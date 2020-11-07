var _ = require('underscore'),

	React = require('react'),
	
	fixtures = require('../../../config/fixtures'),

	Section = require('../_section'),
	Marker = require('components/marker'),
	MarkerMobilePortrait = require('components/markerMobilePortrait'),
	PlaybarVertical = require('components/playbarVertical'),
	PlaybarHorizontal = require('components/playbarHorizontal'),
	Icon = require('components/icon'),
	ControlButton = require('components/controlButton'),
	ControlButtonPlay = require('components/controlButtonPlay'),
	ShareButtons = require('components/shareButtons'),
	LoadingIndicator = require('components/loadingIndicator');

/*
 *	Template
 */

function rMarkerRow(color, key) {
	return <div key={key}>
		<Marker 
			{...color.marker}
			title='Marker Normal'
			size='normal' />

		<Marker 
			{...color.marker}
			title='Marker Medium'
			size='medium' />
		
		<Marker 
			{...color.marker}
			title='Marker Small'
			size='small' />
		
		<Marker 
			{...color.marker}
			title='Marker Tiny'
			size='tiny' />
			<div></div>
	</div>;
}

function rMobilePortraitMarker(color,key) {
	return <div><MarkerMobilePortrait title='Marker' time='128.2' {...color.marker}/><br /></div>;
};

function rButton(color, key) {
	return <ControlButton 
		type={_.sample(ControlButton.TYPES)}
		key={key}
		{...color.button}/>;
}

function rPlaybarHorizontal(color,key) {
	return <PlaybarHorizontal
			key={key}
			{...color.playbar}
			collapsed={Math.random()<.5}
			videoDuration={_.sample([234,532,324,125,503,403])}
			progress={_.sample([0.12,0.24,0.23,0.35,0.39,0.45])}
			buffer={_.sample([0.62,0.54,0.83,0.65,0.49,0.45])}
			markers={[Math.random(), Math.random(), Math.random(), Math.random(), Math.random()]}/>;
}

function rPlaybarVertical(color,key) {
	return <PlaybarVertical 
			key={key}
			{...color.playbar}
			videoDuration={_.sample([234,532,324,125,503,403])}
			progress={_.sample([0.12,0.24,0.23,0.35,0.39,0.45])}
			buffer={_.sample([0.62,0.54,0.83,0.65,0.49,0.45])}
			markers={[Math.random(), Math.random(), Math.random(), Math.random(), Math.random()]}/>;
}

function rLoadingIndicator(color,key) {
	return <LoadingIndicator 
				key = {key}
				{...color.loadingIndicator}/>;
}

function rShareButtons(color,key) {
	return <ShareButtons 
				key = {key}
				{...color.button}/>;
}

function r() {

	return (
		<div>
			<Section title='Icons'>
			
			{_.map(Icon.TYPES, function(t) {return <span key={t}><Icon type={t} />&nbsp;&nbsp;</span>;})}

			</Section>	
			<Section title='Markers'>				
				{_.map(fixtures.colors, rMarkerRow)}
			</Section>
			<Section title='Markers Mobile Portrait'>
				{_.map(fixtures.colors, rMobilePortraitMarker)}
			</Section>
			<Section title='Playbar Horizontal'>
				{_.map(fixtures.colors, rPlaybarHorizontal)}
			</Section>
			<Section title='Playbar Vertical'>
				{_.map(fixtures.colors, rPlaybarVertical)}
			</Section>
			<Section title='Buttons'>
					{_.map(fixtures.colors, rButton)}
					<br />
					{_.map(ControlButton.TYPES, function(t) {return <ControlButton key={t} {...fixtures.colors.lightBlue.button} type={t} />;})}
				<h3>Custom icon</h3>
					<ControlButton 
						type='custom'
						iconURL='//misc.videopath.com/clients/babbel/icon.png'
						{...fixtures.colors.orange.button}/>
					<ControlButton 
						type='custom'
						iconURL='//misc.videopath.com/clients/bmw/icon.png'
						{...fixtures.colors.blue.button}/>
					<ControlButton 
						type='custom'
						iconURL='//misc.videopath.com/clients/unilever/icon.png'
						{...fixtures.colors.white.button}/>
					<ControlButton 
						type='custom'
						iconURL='//misc.videopath.com/clients/xbox/icon.png'
						{...fixtures.colors.green.button}/>
				<h3>Large Play Button</h3>
					<ControlButtonPlay 
						size='normal'
						{...fixtures.colors.blue.button}/>
					<ControlButtonPlay 
						size='medium'
						{...fixtures.colors.blue.button}/>
					<ControlButtonPlay 
						size='small'
						{...fixtures.colors.blue.button}/>
					<ControlButtonPlay 
						size='tiny'
						{...fixtures.colors.blue.button}/>
			</Section>
			<Section title='Loading Indicator'>
				<h3>Loading Indicator</h3>
				{_.map(fixtures.colors, rLoadingIndicator)}
			</Section>
			<Section title='Share Buttons'>
				<h3>Share Buttons</h3>
				{_.map(fixtures.colors, rShareButtons)}
			</Section>
		</div>
	);
}

/*
 *	Class
 */
module.exports = React.createClass({
	render: r,
});



