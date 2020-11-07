require('css/components/media.scss');

var lib_loader = require('_old/util/lib_loader'),
	React = require('react'),
	PureRenderMixin = require('react-addons-pure-render-mixin');


function EmbedIFrame(props) {
	return <div className = 'vpp_iframe_wrapper'>
		<iframe 
			width="100%" 
			height="100%" 
			frameBorder="0"
			allowFullScreen
			src={props.src} />
	</div>;
};

function EmbedInstagram(props) {

	var url = "https://instagram.com/p/" + props.serviceIdentifier,

		style = {
			margin:'0px auto',
			maxWidth:500,
			width:'100%',
		};

	return <blockquote className="instagram-media" data-instgrm-captioned data-instgrm-version="4" style={style}>
	   <div style={{padding:8}}>
	      <p><a href={url}></a></p>
	   </div>
	</blockquote>;

};

/*
 *	Template
 */
function r() {

	var url = '',
		id = this.props.serviceIdentifier,
		autoplay = this.props.autoplay,
		content = false;

	switch(this.props.service) {

		case 'youtube':
			url = "//www.youtube.com/embed/"+id+"?wmode=opaque&autoplay="+autoplay;
			content = <EmbedIFrame src={url} />;
			break;

		case 'vimeo':
			url = "//player.vimeo.com/video/"+id+"?autoplay="+autoplay;
			content = <EmbedIFrame src={url} />;
			break;

		case 'soundcloud':
			url = "//w.soundcloud.com/player/?url=http%3A%2F%2Fsoundcloud.com%2F"+id+"&amp;color=ff5500&amp;hide_related=false&amp;show_artwork=true&amp;auto_play="+autoplay;
			content = <EmbedIFrame src={url} />;
			break;

		case 'videopath':
			url = "//player.videopath.com/" + id+"?autoplay="+autoplay;
			content = <EmbedIFrame src={url} />;
			break;

		case 'pinterest':
			url = "http://www.pinterest.com/pin/" + id;
			content = <a data-pin-do="embedPin" href={url}></a>;
			break;

		case 'instagram':
			content = <EmbedInstagram serviceIdentifier={id}/>;
			break;
	}

	return (
		<div style={this.props.style} className={"vpp_media vpp_" + this.props.service}>
			{content}
		</div>
	);
}

var Media = React.createClass({

	render: r,

	mixins: [PureRenderMixin],

	componentDidMount: function() {
		this.executeDynamicEmbeds();
	},

	executeDynamicEmbeds: function() {

		if ( this.props.service === 'pinterest' ) {
			lib_loader.requireLib("pinterest", function(pinterest, wasPreloaded) {
				if (wasPreloaded)
        			pinterest.f.build();
    		});
		}

		
		if ( this.props.service === 'instagram' ) {
			lib_loader.requireLib("instagram", function(instagram) {
        		instagram.Embeds.process();
    		});
		}

	},

	componentWillReceiveProps: function(newProps) {
		if ( newProps.service != this.props.service ) {
			this.needsDynamicEmbedOnUpdate = true;
		}
	},

	componentDidUpdate: function() {
		if ( this.needsDynamicEmbedOnUpdate ) {
			this.executeDynamicEmbeds();
		}
		this.needsDynamicEmbedOnUpdate = false;
	},

	getDefaultProps: function() {
	    return {
	      autoplay: false
	    };
  	},

	propTypes: {
		service: React.PropTypes.oneOf(['youtube', 'vimeo', 'soundcloud', 'videopath', 'instagram', 'pinterest']).isRequired,
		serviceIdentifier: React.PropTypes.string.isRequired,
		autoplay: React.PropTypes.bool
	},
});



/*
 *	Class
 */
module.exports = Media;



