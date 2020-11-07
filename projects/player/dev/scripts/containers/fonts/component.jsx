
var _ = require('underscore'),
	styleInjector = require('util/styleInjector'),
	React = require('react'),
	PureRenderMixin = require('react-addons-pure-render-mixin'),


	markerCSS = _.template(require('raw!./templates/markers.css.txt')),
	overlayCSS = _.template(require('raw!./templates/overlay.css.txt'));


var MarkerOverlayView = React.createClass({

	mixins:[PureRenderMixin],

	render: function(){
		this.updateStyle();
		return false;
	},

	componentWillUnmount: function() {
		if ( this.style ) {
			this.style.remove();
			this.style = null;
		}
	},

	updateStyle: function() {

		var style = '',
			markerFont = this.props.theme.marker.font,
			overlayFont = this.props.theme.overlay.textFont;

		if ( markerFont ) {
			style += markerCSS({font:markerFont});
		}

		if ( overlayFont ) {
			style += overlayCSS({font:overlayFont});
		}

		if ( this.style ) {
			this.style.replace(style);
		} else {
			this.style = styleInjector.inject(style);
		}
	},

	propTypes: {
		theme: React.PropTypes.object
	},

});

/*
 *	Class
 */
module.exports = MarkerOverlayView;



