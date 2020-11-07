var _ = require('underscore'),
	React = require('react'),
	Playbar = require('components/playbarHorizontal');



/*
 *	Template
 */
var PlaybarWrapper = function(props) {

	var duration = props.videoDuration,
		markers = _.map(props.markers, function(item){
			return item.time / duration;
		});

	var style = {
			position:'absolute',
			left:0,
			right:0,
			bottom:props.playerHeight - props.playerWidth / props.aspect - 16
		};



	return (
		<div style={style}>
			<Playbar 
				highlightedMarker={props.highlightedMarker}
				collapsed={props.collapsed}
				markers={markers}
				videoDuration={props.videoDuration}
				progress={props.progress}
				buffer={props.buffer}
				onProgressSelected={props.onProgressSelected}
				{...props.colors.playbar}/>
		</div>
	);

};

PlaybarWrapper.propTypes = {
	collapsed: React.PropTypes.bool,
	markers:React.PropTypes.array,
	colors:React.PropTypes.object.isRequired,
	videoDuration: React.PropTypes.number.isRequired,
	onTogglePlayClick: React.PropTypes.func.isRequired,
	onProgressSelected: React.PropTypes.func.isRequired
};

module.exports = PlaybarWrapper;

