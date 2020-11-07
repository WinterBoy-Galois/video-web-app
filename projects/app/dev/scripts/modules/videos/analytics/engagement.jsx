var React = require('react'),
	s = require('strings')('videos.analytics'),

	PopularMarkers = require('./popular_markers');

function InteractionItem(props) {
	return <div className ='vp_interaction_item'>
		{props.title}
		<div className='vp_metric'>{props.value}</div>
	</div>;
};

var AnalyticsEngagement = function(props){
	return <div>
		<h3>{s('title_engagement')}</h3>
		<div className='vp_engagement_item'>
			<h4>Interaction overview</h4>
			<InteractionItem 
				title='Total Markers'
				value={props.video.get('revision_info').marker_count}/>
			<InteractionItem 
				title='Total Clicks'
				value={props.data.overlays_opened_all_formatted}/>
			<InteractionItem 
				title='% of viewers clicking'
				value={props.data.percent_interacting_formatted}/>
			<InteractionItem 
				title='Avg clicks / Viewer'
				value={props.data.clicks_per_user_formatted}/>
		</div>
		<div className='vp_engagement_item'>
			<h4>Popular Markers</h4>
			<PopularMarkers 
				data={props.data.popular_markers}
				/>
		</div>
		<div className='clear' />
	</div>;
};

module.exports = AnalyticsEngagement;
