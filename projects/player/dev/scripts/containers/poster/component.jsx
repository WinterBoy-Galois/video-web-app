require('css/containers/poster.scss');

var calculateAspect = require('util/calculateAspectMetrics'),
	React = require('react'),
	PureRenderMixin = require('react-addons-pure-render-mixin'),

	Fader = require('components/fader');

/*
 *	Template
 */
function r() {

	if ( this.props.mobilePortraitUI) {
		// return false;
	}

	var style = calculateAspect(this.props.width, this.props.height, this.state.aspect, false);
	if (this.props.mobilePortraitUI) {
		style = {
			width: this.props.width,
			height:this.props.width / this.state.aspect
		};
	}

	return ( 
		<Fader showing={this.props.show}>
			<div className = 'vpp_poster'>
				<img 
					ref = 'image'
					style = {style}
					// className = {this.state.loaded ? '': 'vpp_hidden'} 
					src={this.props.url} 
					onLoad={this.onImageLoad}/>
			</div>
		</Fader>);
}

var Poster = React.createClass({

	mixins: [PureRenderMixin],

	render: r,

	onImageLoad: function() {
		this.setState({loaded:true, aspect:this.refs.image.naturalWidth / this.refs.image.naturalHeight});
	},

	getInitialState: function() {
		return {loaded:false};
	},

});

/*
 *	Class
 */
module.exports = Poster;



