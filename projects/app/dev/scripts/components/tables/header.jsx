var React = require('react');

var TableHeader = function(props) {
	return (
		<thead><tr>
			{props.children.map(function(child) {
	          	return <th key = {child}>{child}</th>;
	        })}
        </tr></thead>
	);
};

module.exports = TableHeader;



