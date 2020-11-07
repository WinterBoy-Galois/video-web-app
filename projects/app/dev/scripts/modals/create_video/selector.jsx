var _ = require('underscore'),
	React = require('react'),
	Modal = require('components/modal');


function onSelected(index) {
	this.props.onSelected(index);
};

/*
 *	Template
 */
function r() {

	var _this = this;
	var items = _.map(this.props.items, function(item, index){
		if ( !item.showInList ) return false;
		var className = 'vp_item vp_' + item.key + (item.userHasAccess?'': ' vp_no_access');
		return <div className = {className} key = {item.key} onClick={onSelected.bind(_this,index)}>
			<label>{item.title}</label>
		</div>;
	});

	return (
		<div className = 'vp_selector'>
			{items}
		</div>
	);
}

module.exports = React.createClass({
	render: r,
	propTypes: {
	    items: React.PropTypes.array.isRequired,
	    onSelected: React.PropTypes.func.isRequired
	},
});