var React = require('react'),
	s = require('strings')('videos.analytics'),
	Icon = require('components/icon');

function OverviewItem(props){
	return <div className = 'vp_overview_item'>
		<Icon type={props.icon}/>
		{props.title}
		<div className='vp_metric'>{props.value}</div>
	</div>;
};

var AnalyticsOverview = function(props){
	return <div>
		<h3>{s('title_overview')}</h3>
		<OverviewItem
			icon='preview'
			title='Total Views'
			value={props.data.plays_all_formatted} />
		<OverviewItem
			icon='time'
			title='Average View Duration'
			value={props.data.avg_session_time_formatted} />
		<OverviewItem
			icon='flag'
			title='Completion Rate (%)'
			value={props.data.percent_completing_formatted} />
		<div className='clear' />
	</div>;
};

module.exports = AnalyticsOverview;
