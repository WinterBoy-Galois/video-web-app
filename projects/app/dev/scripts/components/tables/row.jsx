var _ = require('underscore'),
	React = require('react');


var TableRow = function(props) {

	var children = [];
	_.each(this.props.children, function(child){
		children.push(<td>{child}</td>);
	});

	return (
		<tr>	
			{children}
        </tr>
	);
};

module.exports = TableRow;
