var _ = require('underscore'),
	React = require('react');


var InlineSelect = function(props) {

	function renderOption(value,key){
		return <option key={key} value={key} >{value}</option>;
	};

	function onChange(event) {
		props.onChange(event.target.value);
	};
	
	return (
		<select 
			disabled={props.disabled} 
			defaultValue={props.defaultValue} 
			onChange={onChange.bind(this)}>
			{_.map(props.options, renderOption)}
		</select>
	);
};

InlineSelect.propTypes = {
	options: React.PropTypes.object.isRequired,
	onChange: React.PropTypes.func.isRequired,
	defaultValue: React.PropTypes.string.isRequired,
	disabled: React.PropTypes.bool
};

module.exports = InlineSelect;
 
