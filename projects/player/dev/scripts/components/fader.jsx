require('css/components/fader.scss');

var _ = require('underscore'),
	React = require('react'),
	PureRenderMixin = require('react-addons-pure-render-mixin');


/*
 *	Template
 */
function r() {
	if ( this.state.removed) {
		return false;
	}
	var className = 'vpp_fader';
	if ( this.state.hidden) {
		className += ' vpp_fader_hidden';
	}
	return <div className={className}>{this.props.children}</div>;
}

var Fader = React.createClass({

	mixins: [PureRenderMixin],

	render: r,

	getInitialState: function() {
		return {
			removed: !this.props.showing,
			hidden: !this.props.showing
		};
	},

	componentWillReceiveProps: function(newProps) {
		if ( newProps.showing != this.props.showing ) {
			clearTimeout(this.fadeTimer);

			if ( newProps.showing ) {
				this.setState({removed:false});
				var _this = this;
				this.fadeTimer=setTimeout(function(){
					_this.setState({hidden:false});
				},1);
			}

			if (!newProps.showing) {
				this.setState({hidden:true});
				var _this = this;
				this.fadeTimer = setTimeout(function(){
				_this.setState({
						removed:true
					});
				},200);
			}

		}
	},

	propTypes: {
		showing: React.PropTypes.bool,
	},

});


/*
 *	Class
 */
module.exports = Fader;


