require('css/components/playbarVertical.scss');

var _ = require('underscore'),
	React = require('react'),
	PureRenderMixin = require('react-addons-pure-render-mixin');

var SCRUBBER_OPACITY = 0.7,
	INDICATOR_OPACITY = 0.3,
	SNAP_DISTANCE_PX = 10;

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
function rIndicator(position, index) {

	var active = index===this.state.overSnappedTo;

	return (
		<div
			style={{
				opacity: active ? SCRUBBER_OPACITY:INDICATOR_OPACITY,
				top:(position * 100 ) + '%',
				backgroundColor:this.props.indicatorColor}}
			className={'vp_marker_indicator ' + (active ? 'vp_highlighted':'')}
			key={index}>
			<svg x="0" y="0" viewBox="0 0 8 8">
	            <polygon 
	            	style={{fill:this.props.indicatorColor}}
	            	points="0,4 4,8 8,4 4,0 0,4"/>
	        </svg>
		</div>
	);
}

/*
 *	Template
 */
function r() {

	var progress = this.props.progress;

	var timeProgress = progress;
	if ( this.state.overSnappedTo !== false ) {
		timeProgress = this.props.markers[this.state.overSnappedTo];
	} else if ( this.state.over !== false ) {
		timeProgress = this.state.over;
	}

	var barProgress = this.state.mouseDown ? timeProgress : progress;

	// calculate time labels
	var timeBottom = timeString(this.props.videoDuration),
		timeCurrent = timeString(timeProgress * this.props.videoDuration),
		timeBottomOpacity = 1;

	// make sure time progress is on the right side of the progression
	var styleTimeProgress = timeProgress < 0.2 ? 
		{top:timeProgress*100 + '%'} : 
		{bottom:(1-timeProgress)*100 + '%'};
	styleTimeProgress.color = this.props.indicatorColor;
	styleTimeProgress.paddingBottom = this.state.touchMode ? 40 : 5; // shift a little for touches so it's easier to read the time over the finger

	// calculate scrubber position
	var scrubberStyle = {
		top:timeProgress * 100 + '%',
		opacity: (this.state.over === false ) ? 0 : (this.state.mouseDown ? SCRUBBER_OPACITY: INDICATOR_OPACITY),
		backgroundColor: this.props.indicatorColor,
		height:this.state.mouseDown ? '4px':'2px',
		marginTop:this.state.mouseDown ? '-2px':'-1px'
	};

	if ( this.state.over !== false || this.props.progress > 0.9 ) timeBottomOpacity = 0;


	return (
		<div
			ref='bar'
			style={_.extend({},{
				borderColor:this.props.outlineColor, 
				backgroundColor:this.props.backgroundColor}, this.props.style)}
			className = 'vpp_playbar_vertical'>

			<div 
				className = 'vp_buffer_bar' 
				style={{
					height:this.props.buffer*100 + '%',
					backgroundColor:this.props.bufferColor}}/>
			<div 
				className = 'vp_progress_bar' 
				style={{
					height:barProgress*100 + '%',
					backgroundColor:this.props.progressColor}}/>

			<div className = 'vp_marker_indicators'>
				{_.map(this.props.markers, this.rIndicator)}
			</div>

			<div 
				style={{
					opacity:timeBottomOpacity,
					color:this.props.indicatorColor}}
				className = 'vp_time_bottom'>
				{timeBottom}
			</div>
			<div 
				className = 'vp_time_progress' 
				style={styleTimeProgress}>
				{timeCurrent}
			</div>

			<div
				style = {scrubberStyle}
				className = 'vp_scrubber'>
			</div>

			<div className = 'vp_mouse_capture' 
				onTouchStart = {this.onTouchStart}
				onTouchEnd = {this.onTouchEnd}
				onTouchMove = {this.onTouchMove}

				onMouseDown = {this.onMouseDown}
				onMouseUp = {this.onMouseUp}
				onMouseMove = {this.onMouseMove}
				onMouseLeave = {this.onMouseLeave} 
				onDrag = {this.onDrag}
				onDragEnd = {this.onDragEnd}
				onClick = {this.onClick}
				draggable={true}
				/>

		</div>
	);
}

var Playbar = React.createClass({

	mixins: [PureRenderMixin],

	render: r,

	rIndicator: rIndicator,

	/*
	 * Touch
	 */
	onTouchStart: function(e) {
		this.setState({
			touchMode:true
		});
		this.updateOverStateFromEvent(e);
		e.preventDefault();
	},

	onTouchMove: function(e) {
		this.updateOverStateFromEvent(e);
		e.preventDefault();
	},

	onTouchEnd: function(e) {
		this.onTimeSelected();

		var _this = this;
		setTimeout(function(){
			_this.setState({
				touchMode:false
			});
		},100);
		
		e.preventDefault();
	},

	/*
	 * Mouse events
	 */
	onMouseMove: function(e){
		if ( this.state.touchMode ) return;
		this.updateOverStateFromEvent(e);
	},

	onMouseDown: function(e) {
		if ( this.state.touchMode ) return;
		this.setState({
			mouseDown:true
		});
	},

	onMouseUp: function() {
		if ( this.state.touchMode ) return;
		this.setState({
			mouseDown:false
		});
	},

	onClick: function(e) {
		if ( this.state.touchMode ) return;
		this.onTimeSelected(e);
	},

	onMouseLeave: function(){
		if ( this.state.touchMode ) return;
		this.setState({
			over:false,
			overSnappedTo:false
		});
	},

	onDrag: function(e) {
		if ( this.state.touchMode ) return;
		e.preventDefault();
		this.updateOverStateFromEvent(e);
		this.setState({
			dragging:true
		});
	},

	onDragEnd: function(e) {
		if ( this.state.touchMode ) return;
		this.onTimeSelected(e);
	},

	updateOverStateFromEvent: function(e) {

		var pageY = e.pageY || e.touches[0].pageY,
			target = e.currentTarget || e.touches[0].target;


		if ( pageY == 0 ) return;

		// get offset and clamp
		var val = (pageY-target.getBoundingClientRect().top) / target.getBoundingClientRect().height;
		val = val > 1 ? 1 : val;
		val = val < 0 ? 0 : val;

		// see if we should snap to a marker
		var snapDistance = SNAP_DISTANCE_PX / this.refs.bar.offsetHeight,
			snappedTo = false, 
			distance = 0, 
			shortestDistance = 1;
		_.each(this.props.markers, function(item, index){
			distance = Math.abs(item-val);
			if (distance < snapDistance && distance < shortestDistance) {
				snappedTo = index;
				shortestDistance = distance;
			}
		});

		this.setState({
			over:val,
			lastOver:val,
			overSnappedTo: snappedTo
		});
	},

	onTimeSelected: function() {
		this.props.onProgressSelected(this.state.over);
		this.setState({
			over:false,
			overSnappedTo:false,
			dragging:false,
			mouseDown:false
		});
	},

	getDefaultProps: function() {
	    return {
	      progress: 0,
	      buffer: 0,
	      markers:[],
	      videoDuration:0
	    };
  	},

  	getInitialState: function() {
  		return {
  			mouseDown:false,
  			dragging:false,
  			over:false,
  			overSnappedTo:false,
  			touchMode:false
  		};
  	},

	propTypes: {
		progress:React.PropTypes.number,
		buffer:React.PropTypes.number,
		markers: React.PropTypes.array,
		videoDuration:React.PropTypes.number,

		outlineColor: React.PropTypes.string,
		progressColor: React.PropTypes.string,
		bufferColor: React.PropTypes.string,
		backgroundColor: React.PropTypes.string,
		indicatorColor: React.PropTypes.string,

		onProgressSelected: React.PropTypes.func
	},

});



/*
 *	Class
 */
module.exports = Playbar;



