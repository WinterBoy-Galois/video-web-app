/*
 * Both brightcove and our own player use video js
 * Only the setup routines are a little different
 */

module.exports = {

	componentWillUnmount: function() {
		clearInterval(this.stateInterval);
	},

	getInitialState: function() {
		return {
			hasPlayed:false
		};
	},

	/*
	 * Events
	 */
	setupEvents: function() {

		var player = this.player,
			lastState = false,
			props = this.props,
			last_current_time = 0,
			_this = this;

		function sendState(state) {
            if (state == lastState) {
                return;
            }
           	props.onStateChange(state);
            lastState = state;
        }

        player.on("pause", function() {
            sendState("paused");
        });

        player.on("play", function() {            
            sendState("playing");
            _this.setState({
            	hasPlayed:true
            });
        });

        player.on("ended", function() {
            sendState("ended");
        });

        player.on("progress", function() {
            props.onBufferChange(player.bufferedPercent());
        });

        player.on("loadedalldata", function() {
            props.onBufferChange(1);
        });

        player.on("timeupdate", function() {
            var progress = player.currentTime() / player.duration();
            progress = isNaN(progress) ? 0 : progress;
            props.onProgressChange(progress);
        });

         // monitor player state, as we don't seem to be getting reliable updates from here
        this.stateInterval = setInterval(function() {
            var delta = Math.abs(last_current_time - player.currentTime());
            last_current_time = player.currentTime();
            if (delta >= 0.1 && lastState == "buffering") {
                sendState("playing");
            } else if (delta < 0.02 && lastState == "playing") {
                sendState("buffering");
            }
        }, 200);

	},


	/*
	 * Commands
	 */

	play: function() {
		this.props.onStateChange('buffering');
		this.player && this.player.play();
	},

	pause: function() {
		if (!this.state.hasPlayed) return;
		this.player && this.player.pause();
	},

	setProgress: function(value) {
		if (this.player) {
			value *= this.player.duration();
			if (isNaN(value)) {
                value = 0;
            }
			this.player.currentTime(value);
		}
	},

	setVolume: function(value) {
		if ( this.player ) {
			this.player.volume(value);
			this.props.onVolumeChange(value);
		}
	}




};