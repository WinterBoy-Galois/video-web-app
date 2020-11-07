require('css/containers/endscreen.scss');

var _ = require('underscore'),
	tinycolor = require('tinycolor'),

	sizeSelector = require('util/sizeSelector'),
	uiConfig = require('config/ui'),

	React = require('react'),
	PureRenderMixin = require('react-addons-pure-render-mixin'),

	Fader = require('components/fader'),

	Logo = require('components/logo'),
	ControlButton = require('components/controlButton'),

	BrandedEndscreen = require('./branded'),
	RegularEndscreen  = require('./regular');

var SHARING_SERVICES = _.keys(require('const').SHARING);

/*
 *	Template
 */
function r() {

	var backgroundColor = this.props.backgroundColor || '#273a45',
		color = tinycolor(backgroundColor).isLight() ? '#222' : '#eee';

	// inner content
	var content = false;
	if ( this.props.branded  ) {
		content = <BrandedEndscreen {...this.props} />;
	} else {
		content = <RegularEndscreen {...this.props} />;
	}

	// share buttons
	var shareButtons = false;
	if (this.props.sharingEnabled && !this.props.mobilePortraitUI) {
		var props = this.props,
			clickHandler = false;
		
		shareButtons = <div className = 'vpp_endscreen_sharing_buttons'>
			{_.map(SHARING_SERVICES, function(item){
					if ( props.onShareClicked ) {
						clickHandler = props.onShareClicked.bind(false, item);
					}
					return <ControlButton 
							onClick={clickHandler}
							color={backgroundColor} 
							type={item.toLowerCase()} 
							key={item}/>;}) 
			}
		</div>;
	}

	// bottom logo branding, always visible for now
	var branding = false;
	if (!this.props.whitelabel&&!this.props.mobilePortraitUI) {
		branding = <div className='vpp_created'>
			Created with <Logo color={color}/>
		</div>;
	}

	// calculate size class
	var sizeClass = 'vpp_' + sizeSelector(uiConfig.endscreenSizeSelector, this.props.playerWidth, this.props.playerHeight).name;


	// dynamic sizing on mobile portrait mode
	var style = {};
	if ( this.props.mobilePortraitUI ) {
		style = {
			bottom: 'auto',
			height: this.props.playerWidth / this.props.aspect + 16
		};
	}


	return (
		<Fader showing={this.props.showing}>
			<div className = {'vpp_endscreen ' + sizeClass} style={style}>
				<div className ='vpp_background' onClick={this.props.onCloseClicked}/>
				<div className = 'vpp_endscreen_content' style={{backgroundColor:backgroundColor, color:color}} >
					<div className = 'vpp_inner_container'>
						<div className = 'vpp_inner'>
							<div className = 'vpp_replay'>
								<ControlButton 
									onClick={this.props.onReplayClicked}
									type='replay' 
									color={backgroundColor}/>
								<br />
								<span className='vpp_text'>Replay Video</span>
							</div>
							{content}
							{shareButtons}
							{branding}
						</div>
					</div>
					
				</div>
			</div>
		</Fader>);
}

var EndscreenView = React.createClass({

	mixins: [PureRenderMixin],

	render: r,

	propTypes: {
		showing: React.PropTypes.bool,


		onCTAButtonClicked: React.PropTypes.func,
		onReplayClicked: React.PropTypes.func,
		onShareClicked: React.PropTypes.func
	},

});

/*
 *	Class
 */
module.exports = EndscreenView;



