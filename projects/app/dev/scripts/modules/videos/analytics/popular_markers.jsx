var _ = require('underscore'),
	React = require('react'),
	s = require('strings')('videos.analytics'),
	Icon = require('components/icon');


var rEntry = function(item,key) {
	return <div key={key}>
		<span>{item.name}</span>
		<span>{item.unique}&nbsp;|&nbsp;{item.total}</span>
	</div>;
};

var AnalyticsPopularMarkers = function(props){

	if (!props.data.length) {
		return <div className='vp_popular_markers vp_empty'>
			We have not collected enough data yet
		</div>;
	}

	return <div className='vp_popular_markers'>
		<div>
			<span><strong>Title</strong></span>
			<span>Clicks (Unique | Total)</span>
		</div>
		<div className = 'vp_popular_markers_inner'>
		
		{_.map(props.data, rEntry)}
		</div>
	</div>;
};

module.exports = AnalyticsPopularMarkers;
