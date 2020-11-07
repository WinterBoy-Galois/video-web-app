require('css/components/socialFeed.scss');

var React = require('react'),
	PureRenderMixin = require('react-addons-pure-render-mixin'),
	libLoader = require('_old/util/lib_loader');

var PinterestEmbed = function(props) {
	var type = (props.service === 'pinterest-profile') ? 'embedUser' : 'embedBoard';

	var numImages = props.width < 400 ? 2 : 3,
        scaleWidth = (props.width - 30) / numImages,
        scaleHeight = props.height - 110;

	return <a 
		data-pin-do={type}
		href={"http://www.pinterest.com/" + props.serviceIdentifier}
		data-pin-scale-height={scaleHeight}
		data-pin-scale-width={scaleWidth} />;
};

/*
 *	Template
 */
function r() {

	var content = false;

	if ( !this.props.service ) {

	}

	else if ( this.props.service === 'twitter' ) {
		content = <div ref ='twitter' />;
	}

	else if (this.props.service.indexOf('pinterest') === 0 ) {
		content = <PinterestEmbed {...this.props} {...this.state}/>;
	}

	// fb embed
	else if ( this.props.service ==='facebook-page') {
		var pageURL = this.props.serviceIdentifier,
		url = "https://www.facebook.com/v2.6/plugins/page.php?app_id=1597846647106700&container_width="+this.state.width+"&height="+this.state.height+"&hide_cover=false&href="+pageURL+"&locale=en_US&sdk=joey&show_facepile=true&show_posts=true&width=500";
		content = <iframe width='100%' height = '100%' src={url} />;
	}

	return (
		<div className={"vpp_social_feed vpp_" + this.props.service} ref='outer'>
			{content}
		</div>
	);
}

var SocialFeed = React.createClass({

	mixins: [PureRenderMixin],

	render: r,

	componentDidMount: function() {
		window.addEventListener('resize', this.onWindowResize);
		this.onWindowResize();
		setTimeout(this.excuteDynamicEmbeds, 200);
	},

	componentWillUnmount: function() {
		window.removeEventListener('resize', this.onWindowResize);
	},

	onWindowResize: function() {
		if (this.props.service === 'twitter' ) return;
		this.setState({
			width:this.refs.outer.offsetWidth,
			height:this.refs.outer.offsetHeight
		});
	},

	excuteDynamicEmbeds: function() {

		// run dynamic twitter code

		if ( !this.props.service ) {

		}
		else if ( this.props.service === 'twitter' ) {


			var twitterID = this.props.serviceIdentifier.replace('@', '');

			// check if this is a widget id
			var re = /[0-9]{10,}/,
				screenName,
				widgetID = '585811408010502144';

			if (re.test(twitterID)) {
        		screenName = "";
        		widgetID = twitterID;
    		} else {
    			screenName = twitterID;
    		}

			var twitterRef = this.refs.twitter;
			libLoader.requireLib("twitter", function(twttr) {
	        twttr.widgets.createTimeline(
	            widgetID,
	            twitterRef, {
	                cards: "visible",
	                height: "100%",
	                screenName: screenName,
	                chrome: 'nofooter noborders noheader'
	            });
    		});
		}

		// run dynamic pinterest code
		else if ( this.props.service.indexOf('pinterest') === 0 ) {
			var type = (this.props.service === 'pinterest-profile') ? 'embedUser' : 'embedBoard';
			libLoader.requireLib("pinterest", function(pinterest) {
		        pinterest.f.build();
    		});
		}
	},

	getInitialState: function() {
		return {
			width:0,
			height:0
		};
	},

	propTypes: {
		service: React.PropTypes.string,
		serviceIdentifier: React.PropTypes.string,
	},
});



/*
 *	Class
 */
module.exports = SocialFeed;