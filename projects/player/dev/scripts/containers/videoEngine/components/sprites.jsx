var _ = require('underscore'),
	React = require('react'),
	EngineMixin = require('../mixins/engineMixin'),
	PureRenderMixin = require('react-addons-pure-render-mixin');


var AUDIO_FILE = 'audio.mp3',
	SPRITE_FILE = 'sprite_{num}.jpg',

	FPS = 25,
	PRELOAD_AFTER_START = 1000,
	PRELOAD_BEFORE_START = 3,
	PRELOAD_PARALLEL = 3,
	MIN_BUFFER_FOR_PLAY = 4;


/*
 *	Helpers
 */
var requestAnimationFrame = window.requestAnimationFrame.bind(window);
if ( !requestAnimationFrame ) {
	requestAnimationFrame = (function() {
	    return window.requestAnimationFrame ||
	        window.webkitRequestAnimationFrame ||
	        window.mozRequestAnimationFrame ||
	        function(callback) {
	            window.setTimeout(callback, 1000 / 60);
	        };
	})();
}

function padInt(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

/*
 *	Template
 */
function r() {

 	var imageIndex = this.state.currentImage,
 		spriteIndex = this.state.currentSprite,
 		nextSpriteIndex = _.min([spriteIndex + 1, this.state.numSprites-1]),

 		imageSheetIndex = imageIndex - spriteIndex * this.state.imagesPerSprite,

 		offsetX = (imageSheetIndex % this.state.spriteWidth) * -100,
        offsetY = Math.floor(imageSheetIndex / this.state.spriteWidth) * -100,

 		firstVisible = Math.floor(spriteIndex%2) === 1;

 	var backgroundSize = (this.state.spriteWidth * 100) + '% ' + (this.state.spriteHeight * 100) + '% ';
 	var visibleStyle = {
 			backgroundSize: backgroundSize,
 			display: 'block',
 			backgroundImage: 'url("' + this.urlForSprite(spriteIndex) + '")',
 			backgroundPosition: offsetX + '% ' + offsetY + '%'
 		},
 		invisibleStyle = {
 			backgroundSize: backgroundSize,
 			display: 'none',
 			backgroundImage: 'url("' + this.urlForSprite(nextSpriteIndex) + '")'
 		};

	return (
		<div className = 'vp_engine_sprites'>
			<audio 
				ref = 'audio'
				src={this.state.audioUrl}
				onPlaying={this.onPlaying}
				onPause={this.onPause}
				onEnded={this.onEnded}
				onTimeUpdate={this.onTimeUpdate}
				preload />
			<div 
				key='first'
				style={!firstVisible ? invisibleStyle : visibleStyle}
				className='vp_sprite'>
			</div>
			<div 
				key = 'second'
				style={firstVisible ? invisibleStyle : visibleStyle}
				className='vp_sprite'>
			</div>
		</div>
	);
	
}

var VideoEngine = React.createClass({

	mixins: [EngineMixin, PureRenderMixin],
	render: r,

	getInitialState: function() {
		var baseURL = this.props.source.sprite_base_url.toLowerCase(),
			width = this.props.source.sprite_width || 4,
			height = this.props.source.sprite_height || 4;
		return {
			spriteWidth: width,
			spriteHeight:height,
			imagesPerSprite: width * height,
			currentImage:0,
			currentSprite:0,
			audioUrl: baseURL + AUDIO_FILE,
			spriteUrl: baseURL + SPRITE_FILE,
			numSprites: Math.ceil(this.props.source.sprite_length / (width*height)),
			playingSuspended: false,
			started:false
		};
	},

	setup: function() {
		this.preloadedSprites = [];
		this.frameCount = 0;
		this.step();
		this.props.onStateChange('ready');
	},

	componentWillUnmount: function() {
		this.unmounting = true;
	},	

	/*
	 * sprite display mechanism
	 */
	step: function( intermediateUpdate ) {
		if ( this.unmounting ) return;

		// request next step
		if (!intermediateUpdate) requestAnimationFrame(this.step.bind(this, false));

		// current indizes
		var targetImage = Math.round(this.refs.audio.currentTime * FPS) + 1;
		if ( targetImage >= this.props.source.sprite_length ) targetImage = this.props.source.sprite_length - 1;
		var targetSprite = Math.floor(targetImage / this.state.imagesPerSprite);

		// preload sprite every 25 frames
		this.frameCount++;
		var bufferedUntil = this.preloadSprites(targetSprite);

		// restart suspended play if enough buffered, or buffered to the end
		if ( this.state.playingSuspended && 
			 ( targetSprite + MIN_BUFFER_FOR_PLAY < bufferedUntil || 
			   bufferedUntil == this.state.numSprites-1) ) {
			this.refs.audio.play();
			this.setState({
				playingSuspended:false
			});
		}


		// suspend play if we run out of loaded sprites
		else if ( 	targetSprite > bufferedUntil && 
					this.state.lastUserCommand == 'play' && 
					!this.state.playingSuspended 
				){
			this.refs.audio.pause();
			this.setState({
				playingSuspended:true
			});
			this.props.onStateChange('buffering');
			return;
		}

		// only display current image if sprite is full available
		if (targetSprite > bufferedUntil) {
			return;
		}
		
		// set state
		if ( this.state.currentImage != targetImage ) {
			this.setState({
				currentImage: targetImage,
				currentSprite: targetSprite
			});
		}
	},

	/*
	 * sprite preloading
	 */
	preloadSprites: function(targetSprite) {

		// maker sure sprites are loading
		var bufferedUntil = targetSprite-1,
			max = this.state.currentSprite + (this.state.started ? PRELOAD_AFTER_START : PRELOAD_BEFORE_START),
			max = _.min([max, this.state.numSprites]),
			amountSpritesPreloading = 0;

		for (var i = targetSprite; i < max; i++ ) {

			var sprite = this.preloadedSprites[i];

			// if this image is complete and it had buffered up to the last image
			// move buffered pointer by 1
			if ( sprite && !sprite.error && sprite.complete && bufferedUntil == i-1) {
				bufferedUntil = i;
			}

			// start preloading sprite if this is not happening atm
			if ( (!sprite || sprite.error) && amountSpritesPreloading < PRELOAD_PARALLEL ) {
				sprite = new Image();
				sprite.src = this.urlForSprite(i);
				sprite.addEventListener('error', function(){
					sprite.error = true;
				});
				this.preloadedSprites[i] = sprite;
			}

			// count amount of sprites currently preloading
			if ( sprite && !sprite.complete && !sprite.error) {
				amountSpritesPreloading++;
			}
	
		}

		// propagate buffered until
		if ( this.frameCount % 6 == 0 ) {
			if ( bufferedUntil < 0 ) {
				this.props.onBufferChange(0);
			} else {
				this.props.onBufferChange((bufferedUntil+1)/(this.state.numSprites));
			}
		}
		return bufferedUntil;
	},

	/*
	 *	 Helpers
	 */
	urlForSprite:function(index) {
		return this.state.spriteUrl.replace("{num}", padInt(index, 5));
	},

	/*
	 * Events
	 */
	onTimeUpdate: function() {
		var progress = this.refs.audio.currentTime / this.refs.audio.duration;
		progress = isNaN(progress) ? 0 : progress;
        this.props.onProgressChange(progress > 1 ? 1 : progress);
	},

	onPause: function() {
		if ( this.state.playingSuspended ) {
			this.props.onStateChange('buffering');
		} else {
			this.props.onStateChange('paused');
		}
	},

	onPlaying: function() {
		this.props.onStateChange('playing');
	},

	onEnded: function() {
		this.props.onStateChange('ended');
	},

	/*
	 * Commands
	 */
	play: function() {
		this.props.onStateChange('buffering');
		
		if ( !this.state.playingSuspended )
			this.refs.audio.play();

		this.setState({
			lastUserCommand:'play',
			started:true
		});
	},

	pause: function() {
		this.refs.audio.pause();

		if ( this.state.playingSuspended ) 
			this.props.onStateChange('paused');

		this.setState({
			lastUserCommand:'pause',
			playingSuspended: false
		});
	},

	setProgress: function(value) {
		this.refs.audio.currentTime = value * this.refs.audio.duration;
		this.step(true);
	},

	setVolume: function(value) {
		this.refs.audio.volume = value;
		this.props.onVolumeChange(value);
	}

});

/*
 *	Class
 */
module.exports = VideoEngine;



