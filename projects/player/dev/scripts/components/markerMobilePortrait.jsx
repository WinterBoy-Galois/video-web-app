require('css/components/markerMobilePortrait.scss');

var React = require('react'),
	Icon = require('./icon');

// helpers
function timeString(time) {
	var secs = Math.floor(time%60);
	if (secs < 10 ) secs = '0' + secs;
	if (time < 60 ) return '0:' + secs;
	return Math.floor(time/60) + ':' + secs;
}


var Marker = function(props) {

	var style = {
		backgroundColor:props.highlighted ? props.activeBackgroundColor : props.backgroundColor,
		color:props.highlighted ? props.activeTextColor : props.textColor,
		borderColor: props.outlineColor
	};
	var className = 'vpp_marker_mobile_portrait ' + (props.highlighted ? ' vpp_highlighted' : '');

	return (
		<div  onClick={props.onClick} style={style} className = {className}>
			<svg className = 'vpp_diamond' x="0" y="0" viewBox="0 0 8 8">
	            <polygon 
	            	style={{fill:style.color}}
	            	points="0,4 4,8 8,4 4,0 0,4"/>
	        </svg>
			<span className = 'vpp_time'>{timeString(props.time)}</span> <span className='vpp_title'>{props.title}</span>
			<Icon type='arrowRight' color = {style.color} />
		</div>
	);
};


module.exports = Marker;