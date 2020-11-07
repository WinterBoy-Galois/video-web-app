var _ = require('underscore'),
	React = require('react');


function rValue(val) {
	var style = {
		cursor:'pointer'
	};
	return <span 
	    onClick={this.onChange.bind(this, val)}
		style={style} 
		key={val} 
		className={this.props.current==val?'vp_active':''}> 
		{val}&nbsp;|&nbsp; 
	</span>;
};

/*
 *	Template
 */
function r() {
	return (
		<div key={this.props.key}>
			<strong>{this.props.title}: </strong>
			{_.map(this.props.values, this.rValue)}
		</div>
	);
}

/*
 *	Class
 */
module.exports = React.createClass({
	onChange: function(val){
		this.props.onChange(val);
	},
	render: r,
	rValue: rValue,
});



