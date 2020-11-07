var _ = require('underscore'),
	sizeSelector = require('util/sizeSelector'),
	uiConfig = require('config/ui'),
	React = require('react'),
	ReactDom = require('react-dom'),
	PureRenderMixin = require('react-addons-pure-render-mixin'),
	Marker = require('components/marker');


/*
 * Render all Markers
 */
function rMarker(markerConf,markerHeight,marker, index) {

	var markerHighlighted = index===this.props.highlightedMarker,
		markerCollapsed = (this.props.collapsed || markerConf.showOnlyCurrentMarker ) && !(markerHighlighted),
		left = (this.props.collapsed ? 10:42) - (markerCollapsed ? 300 : 0),
		style = {
			zIndex: markerHighlighted ? 1000: (index+1) * 20,
			transform:'translate('+left+'px)',
			WebkitTransform: 'translate('+left+'px)',
			top: 'calc( ' +(marker.time / this.props.videoDuration * 100)+ '% - '+markerHeight/2+'px )',
			minWidth: this.state.minMarkerWidth
		},

		showClickHint = this.props.showClickHint && markerHighlighted,

		props = this.props,

		onClick = function(e) {
			e.stopPropagation();
			props.onMarkerClick(index);
		};

	var clickHelper = false;

	/*
	 * Build Marker
	 */
	var renderedMarker = (
		<Marker 
			ref={'marker' + index}
			onClick={onClick}
			highlighted={markerHighlighted}
			style={style}
			key={marker.id}
			title={marker.title}
			size={markerConf.name}
			showClickHint={showClickHint}
			{...this.props.colors.marker}/>
	);

	/*
	 * Build ClickHelper
	 */
	var computedMarkerWidth = this.state['markerWidth' + index];
	style = _.extend({}, style, {
		zIndex:markerHighlighted ? 500 : (index),
		width: computedMarkerWidth,
		top: 'calc( ' +(marker.time / this.props.videoDuration * 100)+ '% - 20px )',
	});


	var clickHelper = <div 
		onClick={onClick}
		key={index} 
		style={style} 
		className = 'vpp_click_helper' />;

	return [renderedMarker, clickHelper];
};

/*
 * Render special branded marker
 */
function rBrandedMarker() {
	if ( !this.props.branded ) return false;

	function onClick() {
		window.open('https://videopath.com');
	}

	var left = (this.props.collapsed ? 10:44);
	var style = {
		zIndex: 50,
		transform:'translate('+left+'px)',
		WebkitTransform: 'translate('+left+'px)',
		top: -44
	};

	return <Marker 
		{...uiConfig.brandedMarkerColors}
		style={style} 
		title = {<span>Built with <strong>Videopath</strong></span>}
		onClick={onClick}/>;
};

/*
 *	Template
 */
function r() {

	var markerConf = sizeSelector(uiConfig.markerHeightSelector, this.props.playerWidth, this.props.playerHeight),
	    markerHeight = uiConfig.markerHeigths[markerConf.name],
	    offset = markerHeight/2;

	return (
		<div
			className='vpp_markers' 
			ref='markers'>	
			{this.rBrandedMarker()}
			{_.map(this.props.markers, this.rMarker.bind(this,markerConf, markerHeight))}
		</div>
	);
}

var Markers = React.createClass({

	mixins: [PureRenderMixin],

	render: r,

	rMarker: rMarker,

	rBrandedMarker: rBrandedMarker,

	getInitialState: function() {
		return { minMarkerWidth:0 };
	},

	componentDidMount: function() {
		this.scheduleUpdateMarkerMetrics();
	},

	componentWillUnmount: function() {
		clearTimeout(this.widthTimer);
	},

	componentWillReceiveProps: function(newProps) {

		// update min marker width if markers or player dimensions change
		if ( this.props.markers != newProps.markers ||
			 this.props.playerWidth != newProps.playerWidth ||
			 this.props.playerHeight != newProps.playerHeight ) {
			this.scheduleUpdateMarkerMetrics();
		}
	},

	scheduleUpdateMarkerMetrics: function() {
		clearTimeout(this.widthTimer);
		var _this = this;
		this.widthTimer = setTimeout(function(){
			_this.updateMarkerMetrics();
		},2);
	},

	/* 
	 * Make sure markers are equal length if this has been configured 
	 * This is a bit hacky but works quite well overall
	 */
	updateMarkerMetrics: function() {

		var refs = this.refs,
			maxWidth = 0,
			titleDelta = 0,
			newState = {};
		_.each(this.props.markers, function(m, index){
			var textWidth = refs['marker' + index].getTextWidth(),
				markerWidth = ReactDom.findDOMNode(refs['marker' + index]).offsetWidth;
			if ( textWidth > maxWidth ) {
				maxWidth = textWidth;
				titleDelta = markerWidth - textWidth;
			}
			newState['markerWidth' + index] = markerWidth;
		});


		if (!!this.props.colors.marker.equalLengths) {
			this.setState({
				minMarkerWidth:maxWidth+titleDelta
			});
		}

		this.setState(newState);
		
	},

	propTypes: {
		draggable: React.PropTypes.bool,
		collapsed: React.PropTypes.bool,
		colors:React.PropTypes.object.isRequired,
	},

});

/*
 *	Class
 */
module.exports = Markers;



