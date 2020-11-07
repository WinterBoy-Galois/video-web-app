var React = require('react');


var Table = function(props){
	return (
		<table className = 'vp_table'>	
			{props.children}
		</table>
	);
};

module.exports = Table;


