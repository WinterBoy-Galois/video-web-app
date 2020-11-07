var _ = require('underscore'),
	React = require('react'),
	Playbar = require('components/playbarVertical'),
	Button = require('components/controlButton');



/*
 *	Template
 */
var PlaybarWrapper = function(props) {

	var duration = props.videoDuration,
		markers = _.map(props.markers, function(item){
			return item.time / duration;
		});

	var playButtonIcon = 'play';
	if ( props.state == 'playing' ) {
		playButtonIcon = 'pause';
	}

	var left = props.collapsed ? -32 : 2;

	var style = {
			transform:'translate('+left+'px)',
			WebkitTransform: 'translate('+left+'px)'
		};


	return (
		<div className='vp_playbar_controls'>
			<Playbar 
				style={style}
				markers={markers}
				videoDuration={props.videoDuration}
				progress={props.progress}
				buffer={props.buffer}
				onProgressSelected={props.onProgressSelected}
				{...props.colors.playbar}/>
			<Button 
				onClick={props.onIconClick}
				style={_.extend({}, style)}
				{...props.colors.button}
				type={props.customIcon ? 'custom': 'videopath'}
				activeBackgroundColor={props.colors.button.backgroundColor}
				iconURL={props.customIcon} />
			<Button 
				onClick={props.onTogglePlayClick}
				style={_.extend({}, style)}
				{...props.colors.button}
				type={playButtonIcon} />
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

