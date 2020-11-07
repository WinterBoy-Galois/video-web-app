var React = require('react'),
	Section = require('./_section'),

	ProgressBar = require('components/progressBar'),
	Dropzone = require('components/dropzone'),
	LoadingIndicator = require('components/loadingIndicator'),
	Graph = require('components/graph');

function onFileSelected(file) {
	console.log(file);
}

var graphDataSets = [
	{values:[100,2, 39, 20, 1, 234,343, 542, 33, 423], name:'Value 1'},
	{values:[23,70, 2, 233, 343, 234,43, 567, 33, 44], name:'Value 2'}
];


/*
 *	Template
 */
function r() {
	return (
		<Section title='Misc' className = 'vp_misc'>
			<h3>ProgressBar</h3>
			<ProgressBar progress = {0.2} text = 'Uploading...' />
			<ProgressBar progress = {0.4} text = 'Converting...' />
			<ProgressBar progress = {0.8} />
			<h3>Dropzone</h3>
			<Dropzone onFileSelected = {onFileSelected} text='Drag a file here!'/>
			<h3>Graph</h3>
			<Graph 
				datasets={graphDataSets}/>
			<h3>Loading Indicator</h3>
			
		</Section>
	);
}

/*
 *	Class
 */
module.exports = React.createClass({
	render: r,
});



