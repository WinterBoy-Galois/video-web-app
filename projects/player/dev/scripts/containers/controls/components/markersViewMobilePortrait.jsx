var _ =require('underscore'),		
	PureRenderMixin = require('react-addons-pure-render-mixin'),
	React = require('react'),
	ReactDom = require('react-dom'),
	Icon = require('components/icon'),
	Marker = require('components/markerMobilePortrait');




function rMarker(props, marker, index) {
	var highlighted = index===props.highlightedMarker;
	return <Marker 
		key={index}
		highlighted = {highlighted} 
		time = {marker.time} 
		title = {marker.title}
		onClick = {props.onMarkerClick.bind(false, index)}
		{...props.colors.marker}/>;
};


var Markers = React.createClass({

	mixins: [PureRenderMixin],

	render: function() {

		return (
		<div className='vpp_markers_mobile_portrait' style={{backgroundColor:this.props.colors.marker.outlineColor}}>
			<div ref='markers' className = 'vpp_markers_inner'>
				{_.map(this.props.markers, rMarker.bind(false, this.props))}
			</div>
			<div style={{color:this.props.colors.marker.textColor, backgroundColor:this.props.colors.marker.backgroundColor}} className = 'vpp_branding'><i>Created with Videopath</i></div>
		</div>
		);
	},

	scrollMarkersTo: function(target, current) {
		clearTimeout(this.scrollTimer);

		var stepSize = 5,
			stepMS = 20;
		var markers = ReactDom.findDOMNode(this.refs.markers),
			current = current || markers.scrollTop,
			delta = ( current - target );

		if ( Math.abs(delta) <= stepSize ) {
			if ( markers ) markers.scrollTop = target;
		} else {
			current += delta < 0 ? stepSize : - stepSize;
			if ( markers ) markers.scrollTop = current;
			this.scrollTimer = setTimeout(this.scrollMarkersTo.bind(this,target, current), stepMS);
		}

	},

	componentWillReceiveProps: function(newProps) {
		if (newProps.highlightedMarker !== this.props.highlightedMarker && newProps.highlightedMarker !== false) {
			var top = (newProps.highlightedMarker ) * 60 - 10;
			this.scrollMarkersTo(top);
		}
	}

});


module.exports = Markers;


