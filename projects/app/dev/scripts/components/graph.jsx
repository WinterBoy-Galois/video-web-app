var _ = require('underscore'),
	util = require('./util'),
	React = require('react'),
	numeral = require('numeral');

function splineCurve(FirstPoint,MiddlePoint,AfterPoint,t) {
	var d01=Math.sqrt(Math.pow(MiddlePoint.x-FirstPoint.x,2)+Math.pow(MiddlePoint.y-FirstPoint.y,2)),
		d12=Math.sqrt(Math.pow(AfterPoint.x-MiddlePoint.x,2)+Math.pow(AfterPoint.y-MiddlePoint.y,2)),
		fa=t*d01/(d01+d12),
		fb=t*d12/(d01+d12);
	return {
		left : {
			x : MiddlePoint.x-fa*(AfterPoint.x-FirstPoint.x) || 0,
			y : MiddlePoint.y-fa*(AfterPoint.y-FirstPoint.y) || 0
		},
		right : {
			x: MiddlePoint.x+fb*(AfterPoint.x-FirstPoint.x)  || 0,
			y : MiddlePoint.y+fb*(AfterPoint.y-FirstPoint.y) || 0
		}
	};
}

function prepareDatasets(datasets) {

	// max of both sets
	var result = {},
		max = _.max(_.map(datasets, function(set){return _.max(set.values);}));

	if (max <= 0) max = 1;

	var numSets = datasets.length;

	// regular datasets
	result.datasets = _.map(datasets, function(set, setIndex){
		if (set.values.length == 1) {
			set.values = [set.values, set.values];
		};

		var length = set.values.length,
			step = 100 / (length-1);
		var rSet = _.map(set.values, function(val, index){
			return {
				y:(100 - (val*100/max)),
				x:(index * step),
				total:length
			};
		});

		return rSet;
	});

	// add bezier info
	result.beziersets = _.map(result.datasets, function(set){
		if ( set.length < 2 ) {
			return 'M 0 100 L 100 100';
		}
		var result = 'M ' + set[0].x + ' ' + set[0].y + ' C';

		var controlSet = [];
		for (var i=0; i < set.length; i++) {
			var prev = set[(i > 0) ? i-1:i],
				now = set[i],
				next = set[(i >= set.length-1) ? set.length-1 : i+1],
				t = 0.4;
			controlSet.push(splineCurve(prev, now, next, t));
		}	

		for (var i = 0; i < set.length-1; i++) {
			var point = set[i+1],
				cPoint1= controlSet[i].right,
				cPoint2 = controlSet[i+1].left;
			result += ' ' + cPoint1.x + ' ' +  cPoint1.y + ' ' + cPoint2.x + ' ' + cPoint2.y + ' ' + point.x + ' ' + point.y ;
		}
		return result;
	});

	result.range = {min:0, max:max};

	return result;
};

/*
 * Rendering
 */

function rGrid(selected, d) {

	if (!d.length) return;
	function rLineV(item, index) {
		return <line 
			key={index}
			x1={item.x + '%'}
			x2={item.x + '%'}
			y1='0%'
			y2='100%'
			className={selected == index ? 'vp_selected':''}
			/>;
	};


	return <g className='vp_grid'>
		<line x1='0%' x2='100%' y1='0%' y2='0%' />
		<line x1='0%' x2='100%' y1='50%' y2='50%' />
		<line x1='0%' x2='100%' y1='100%' y2='100%' />
		{_.map(d[0],rLineV)}
	</g>;
	
};



function rLines(selected, val, index) {
	if (util.detectIE()) {
		return false;
	}
	return <g className='vp_dataset vp_line' key={index}> 
		<path d={val}/>
	</g>;
};

function rAreas(selected, val, index) {
	return <g className='vp_dataset vp_area' key={index}>
		<path d={ val + ' L 100 100 L 0 100 Z'}/>
	</g>;
};

/*
 * 	render the circles
 */
function rCircles(selected, vals, index) {

	if (vals.length > 100) { return false; }

	function rCircle(val, index) {
		return <circle 
			className={selected == index ? 'vp_selected':''}
			key={index}
			cx={val.x + '%'}
			cy={val.y + '%'} 
			r="4"/>;
	};

	return <g className='vp_dataset vp_circles' key={index}>
		{_.map(vals,rCircle)}
	</g>;

};

/*
 * Capture mouse events when over the graph
 */
function rHoverCapture(val, index) {

	var _this = this;
	function onOver(index) {	
		_this.setState({selected:index});
	};

	var width = 100 / val.total;
	return <rect 
		onMouseOver={onOver.bind(this,index)}
		key={index}
		x={val.x-width/2}
		y='0' 
		width={width}
		fillOpacity='0.00001'
		height="100" />;
};

/* 
 * 	Render the horizontal labels
 */
function HorizontalLabels(props) {

	var amountLabels = _.min([props.max, props.labels.length]),
		i=0, 
		labels=[];
	if ( amountLabels < 2 ) return <div></div>;

	// reduce labels
	for (i=0;i<amountLabels; i++) {
		var reducedIndex = Math.round((i/(amountLabels-1)) * (props.labels.length-1));
		labels[i] = props.labels[reducedIndex];
	};

	function rLabel(text,index) {
		var	sectionSize = 100 / (amountLabels-1),
			style = {
				left:(index * sectionSize) - 0.5 * sectionSize + '%',
				width:sectionSize + '%'
			};
		return <div style={style} key={index}>{text}</div>;
	};

	return (
		<div className = 'vp_hor_labels'>
			<div>{_.map(labels, rLabel)}</div>
		</div>);
};

function VerticalLabels(props) {
	var d = numeral(Math.round((props.range.min + props.range.max) / 2)).format(props.format),
		min = numeral(props.range.min).format(props.format),
		max = numeral(props.range.max).format(props.format);
	return (
		<div className = 'vp_ver_labels'>
			<div>{max}</div>
			<div>{max}</div>
			<div>{d}</div>
			<div>{d}</div>
			<div>{min}</div>
			<div>{min}</div>
		</div>);
};

function DetailLabel(props) {
	if ( props.selected < 0 ) {
		return <div></div>;
	}
	var title = props.labelsLong[props.selected],
		offset = props.selected / (props.labelsLong.length-1) * 100,
		style = {
			left:offset <50 ? offset+1 + '%' : false,
			right:offset >=50 ? (101-offset) + '%' : false,
		};

	function rVal(set, index) {
		var val = numeral(set.values[props.selected]).format(props.valueFormat);
		return <div key={index}>{val + ' ' + set.name}</div>;
	};

	return <div className='vp_detail_label' style={style}>	
		<div>{title}</div>
		{_.map(props.datasets, rVal)}
	</div>;
};

function r() {

	

	if (this.props.datasets.length <= 0) {
		return <div className = 'vp_graph'></div>;
	};

	var d = prepareDatasets(this.props.datasets),
		selected = this.state.selected;

	return <div 
		onMouseLeave={this.setState.bind(this,{selected:-1}, null)}
		className = 'vp_graph'>

		<div className = 'vp_svg_wrapper'>
			<svg>{rGrid.bind(this, selected)(d.datasets)}</svg>
			<svg
				viewBox="0 0 100 100"
				preserveAspectRatio="none">
				<g>{_.map(d.beziersets,rAreas.bind(this,selected))}</g>
				<g>{_.map(d.beziersets,rLines.bind(this, selected))}</g>
			</svg>
			<svg>{_.map(d.datasets, rCircles.bind(this, selected))}</svg>
			<svg
				viewBox="0 0 100 100"
				preserveAspectRatio="none">{_.map(d.datasets[0], rHoverCapture.bind(this))}</svg>
			<DetailLabel
				selected={this.state.selected}
				{...this.props} />
		</div>
		<HorizontalLabels 
			max={this.props.maxHorizontalLabels}
			labels={this.props.labelsShort}/>
		<VerticalLabels 
			format={this.props.valueFormat}
			range={d.range} />
		
		<div className='clear' />
	</div>;

}

module.exports = React.createClass({

	render: r,

	getInitialState: function(){
		return {
			selected:-1
		};
	},

	getDefaultProps: function(){
		return {
			datasets:[],
			labelsShort:[],
			labelsLong:[],
			maxHorizontalLabels:10,
			valueFormat:'0.[00]a'
		};
	},

	/*
	 * Props
	 */
	propTypes: {
		datasets: React.PropTypes.array,
		labelsShort: React.PropTypes.array,
		labelsLong: React.PropTypes.array,
		valueFormat:React.PropTypes.string
	}
});





