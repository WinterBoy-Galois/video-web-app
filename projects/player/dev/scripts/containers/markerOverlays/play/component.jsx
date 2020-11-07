require('css/containers/markerOverlays.scss');

var _ = require('underscore'),
	sizeSelector = require('util/sizeSelector'),
	uiConfig = require('config/ui'),
	React = require('react'),
	PureRenderMixin = require('react-addons-pure-render-mixin'),
	Block = require('./block'),
	ControlButton = require('components/controlButton');


var MARKER_MARGIN = 200,
	UI_MARGIN = 5,
	BUTTON_SIZE = 40,
	BUTTON_MARGIN = 2 * UI_MARGIN + BUTTON_SIZE;

function rBlock(block, index) {
	
};

/*
 *	Template
 */
function rMarker(marker, closed, removed) {

	/*
	 * Get content
	 */
	var contents = _.sortBy(marker.contents, function(item){return item.ordinal;}),
		content = false;

	// see if we have a fullscreen block
	var fullscreenBlock = _.find(contents, function(block){
		return block.type == 'website' || block.type == 'social';
	});

	if (fullscreenBlock) {
		content = <Block 
			{...fullscreenBlock} />;
	}

	else {
		content = _.map(contents, function(block,index){
			return <Block {...block} key={index} removed={removed}/>;
		});
		content.unshift(<h1 className='vpp_marker_title'>{marker.title}</h1>);
	}

	/*
	 * Overlay layout calculations
	 */
	var overlayStyle = {},
		closeButtonStyle = {},
		displayMode = 'slideRight';
	if ( this.props.playerWidth < 400 || (this.props.playerWidth / this.props.playerHeight < 1 && this.props.playerWidth < 500))  {
		displayMode = 'slideBottom';
	}

	if (displayMode == 'slideBottom' ) {
		overlayStyle = {
			bottom:UI_MARGIN,
			left:UI_MARGIN,
			right:UI_MARGIN,
			top:BUTTON_MARGIN
		};

		closeButtonStyle = {
			top:UI_MARGIN,
			right:UI_MARGIN,
			position:'absolute'
		};

	} else {
		var maxAvailableWidth = this.props.playerWidth - BUTTON_MARGIN,
			targetWidth = fullscreenBlock ? uiConfig.contentBlocks[fullscreenBlock.type].maxWidth : uiConfig.overlayMaxWidth,
			width = _.min([targetWidth, maxAvailableWidth]),
			markerMargin = 0;

		if ( width < maxAvailableWidth ) {
			markerMargin = _.min([MARKER_MARGIN, maxAvailableWidth-width]);
		}

		var	marginWithButton = (this.props.playerWidth - markerMargin - ( width + BUTTON_SIZE  )) / 2;

		overlayStyle = {
			top:UI_MARGIN,
			bottom:UI_MARGIN,
			right:marginWithButton + BUTTON_SIZE + UI_MARGIN,
			left:marginWithButton + markerMargin
		};

		closeButtonStyle = {
			top:UI_MARGIN,
			right:marginWithButton,
			position:'absolute'
		};
	}

	var sizeClass = 'vpp_' + sizeSelector(uiConfig.overlaySizeSelector, this.props.playerWidth).name;

	var className = 'vpp_marker_overlays vpp_ios_fix' 
		+ (fullscreenBlock ? ' vpp_fullscreen':'') 
		+ (closed ? ' vpp_closed' : '')
		+ (removed ? ' vpp_removed' : '')
		+ (displayMode == 'slideBottom' ? ' vpp_slide_bottom': '');
	return (
		<div className = {className} key={marker.key}>
			<div className ='vpp_background' onClick={this.props.onCloseClicked}/>
			<ControlButton 
				type='close' 
				style={closeButtonStyle} 
				onClick={this.props.onCloseClicked} 
				backgroundColor='#ffffff'
				activeBackgroundColor='#ffffff'/>
			<div className = {'vpp_marker_overlay ' + sizeClass} style={overlayStyle} >
				{content}
			</div>
		</div>);
}

function r() {

	// opened or last opened Marker
	var topMarker = this.props.openedMarker || this.state.lastOpenedMarker;

	var _this = this;
	var result = _.map(this.props.viewedMarkers, function(item) {
		if ( !item ) return false;
		var isTop = topMarker && item && (item.key == topMarker.key);
		var closed = _this.state.closed || !isTop;
		var removed = _this.state.removed || !isTop;
		return _this.renderMarker(item, closed, removed);
	});

	return <div>{result}</div>;
}

var MarkerOverlayView = React.createClass({

	mixins: [PureRenderMixin],

	render: r,

	renderMarker: rMarker, 

	getInitialState: function() {
		return {
			lastOpenedMarker: false,
			closed: true,
			removed: true
		};
	},

	componentWillReceiveProps: function(props) {

		// remember last openened marker
		if ( props.openedMarker ) {
			clearTimeout(this.closeTimer);
			this.setState({
				lastOpenedMarker: props.openedMarker,
				removed:false
			});
			var _this = this;
			setTimeout(function(){
				_this.setState({
					closed:false
				});
			},10);
		}

		if ( !props.openedMarker && !!this.props.openedMarker ) {
			this.setState({
				closed:true
			});
			var _this = this;
			this.closeTimer = setTimeout(function(){
				_this.setState({
					removed:true
				});
			},200); // remove after one second to prevent accidental clicks on ui behind markers
		}
	},

	propTypes: {
	},

});

/*
 *	Class
 */
module.exports = MarkerOverlayView;



