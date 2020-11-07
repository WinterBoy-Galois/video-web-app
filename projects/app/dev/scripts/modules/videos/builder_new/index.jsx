var config = require('config'),

	React = require('react'),
	
	// mixins
	BackboneMixin = require('mixins/backbone'),
	UtilsMixin = require('mixins/utils');

function r() {

	var builderURL = config.builderURL + "?build=true&videoID=" + this.props.video.get("id");
	console.log(builderURL);

	return (
			<div className ='vpa_builder'>
				<div className = 'vpa_frame'>
					<iframe src={builderURL} />
				</div>
			</div>
		);
};


module.exports = React.createClass({
	mixins: [BackboneMixin, UtilsMixin],
	render: r,
	backboneProps: ['video', 'revisions'],
	propTypes: {
		team: BackboneMixin.PropTypes.Model.isRequired,
		video: BackboneMixin.PropTypes.Model.isRequired,
	    revisions: BackboneMixin.PropTypes.Collection.isRequired,
	},
});

