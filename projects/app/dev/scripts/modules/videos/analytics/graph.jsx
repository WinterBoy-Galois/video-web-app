var _ = require('underscore'),
	config = require('config/analytics'),
	
	React = require('react'),

	LoadingIndicator = require('components/loadingIndicator'),
	Graph = require('components/graph');

var groups = _.mapObject(config.groups, function(i){return i.name;});


module.exports = function(props) {

	var metricDef = config.metrics[props.metric],
		valueFormat = config.attrs[metricDef[0]].format,
		datasets = _.map(metricDef, function(key){
			return {
				values: _.map(props.data, function(d){return d[key];}),
				name: config.attrs[key].name
			};
		}),
		labelsShort = _.map(props.data, function(d){return d['dateFormattedShort'];}),
		labelsLong = _.map(props.data, function(d){return d['dateFormattedLong'];});

	function rGroupItem(item, key) {
		return <span 
			key={key}
			onClick={props.onChangeGrouping.bind(this,key)}
			className={key==props.grouping?'vp_selected':''}>
			{item}
		</span>;
	};

	return <div>
			<div className='vp_analytics_graph'>
				<Graph
					valueFormat={valueFormat}
					datasets={datasets} 
					labelsLong={labelsLong}
					labelsShort={labelsShort} />
				<LoadingIndicator 
					visible={props.loading}
					/>
			</div>
			<div className = 'vp_groupby'>
				Group by: {_.map(groups, rGroupItem.bind(this))}
			</div>
		</div>;
};