require('css/components/playbarHorizontal.scss');

var _ = require('underscore'),
	React = require('react'),
	Button = require('components/controlButton');


// helpers
function timeString(time) {
	var secs = Math.floor(time%60);
	if (secs < 10 ) secs = '0' + secs;
	if (time < 60 ) return '0:' + secs;
	return Math.floor(time/60) + ':' + secs;
}


/* 
 * Indicator
 */

function rIndicator(props, position,index) {
	return (
		<div
			key={index}
			style={{left:(position*100) + '%'}}
			className={'vp_marker_indicator ' + (props.highlightedMarker === index ? 'vpp_highlighted' : '') }
			>
				<svg  x="0" y="0" viewBox="0 0 8 8">
		            <polygon 
		            	style={{fill:props.indicatorColor}}
		            	points="0,4 4,8 8,4 4,0 0,4"/>
		        </svg>
			</div>);
}

var clickDisabled = false;

var Playbar = function(props) {

	var time = timeString(props.videoDuration * props.progress);

	var timeStyle = {};
	if ( props.progress < 0.5 ) {
		timeStyle.left = props.progress * 100 + '%';
	} else {
		timeStyle.right = (1-props.progress) * 100 + '%';
	}	


	var className = 'vpp_playbar_horizontal ' + (props.collapsed ? 'vpp_collapsed ' : ' ');

	var style = {
			opacity:props.collapsed ? 0: 0.8,
			top:'2px',
			left:'2px',
			transition: 'opacity 0.3s ease-in'
		};

	var onTouchStart = function(e) {
		clickDisabled = true;
		onUpdateTimeFromEvent(e);
		
	};

	var onClick = function(e) {
		if ( clickDisabled ) return;
		onUpdateTimeFromEvent(e);
	};

	var onUpdateTimeFromEvent = function(e) {
		var pageX = e.pageX || e.touches[0].pageX,
			target = e.currentTarget;

		// get offset and clamp
		var val = (pageX-target.getBoundingClientRect().left) / target.getBoundingClientRect().width;
		val = val > 1 ? 1 : val;
		val = val < 0 ? 0 : val;


		props.onProgressSelected(val);
	};

	return (
		<div className={className} style={{backgroundColor:props.outlineColor}}>
			<div onTouchStart={onTouchStart} onClick={onClick} className='vpp_background' style={{backgroundColor:props.backgroundColor, borderColor:props.outlineColor}}>
				<div className = 'vpp_progress_bar' style={{backgroundColor:props.progressColor, width:(props.progress*100)+'%'}}>
				</div>
				{_.map(props.markers, rIndicator.bind(false, props))}
				<div style = {timeStyle} className = 'vpp_time'>
					{time}
				</div>

			</div>
		</div>
	);

	return <div></div>;


};

module.exports = Playbar;


