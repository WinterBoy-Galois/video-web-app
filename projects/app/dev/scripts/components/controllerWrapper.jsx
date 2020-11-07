var React = require('react'),
	Marionette = require('marionette');

/*
 *	Template
 */
function r() {
	return <div ref = 'region' className = 'vp_wrapper' >
	</div>;
}

var Wrapper = React.createClass({
	render: r,
	componentDidMount: function(){
		this.region = new Marionette.Region({
  			el: this.refs.region
		});
		if ( this.props.controller ) {
			this.region.show(this.props.controller.rootView);
		}
	},
	componentWillUnmount: function() {
		this.region.empty();
	},
	shouldComponentUpdate: function() {
		return false;
	},
	componentWillReceiveProps: function(nextProps) {
		this.region.empty();
		if ( nextProps.controller ) {
			this.region.show(nextProps.controller.rootView);
		}
	},
	propTypes: {
	    controller: React.PropTypes.object
	},
});


/*
 *	Class
 */
module.exports = Wrapper;


