var _ = require('underscore'),
	React = require('react'),

	strings = require('strings').strings;


var nameSpaceMap = {
	'ops': 'operations',
	'login': 'Login Pages'
};

function sanitizeNamespace(string) {
	var result =_.map(string.split('.'), function(item) {
		if ( nameSpaceMap[item] ) {
			item = nameSpaceMap[item];
		}
		return item.replace(/_/g, ' ');
	});

	return _.compact(result).join(' → ');
};

/*
 *	Template
 */
function r() {

	var count = 0;
	function renderStringObject(s, namespace) {
		count++;
		var result = _.map(s, function(Value, key) {

			if (key.indexOf && key.indexOf('_modal')>=0) {
				return false;
			}

			if (_.isObject(Value) && !Value.type ) {
			 	return renderStringObject(Value, namespace + key + '.');
			}

			return <tr className = {'vp_color_' + count % 4}>
				<td>{sanitizeNamespace(key)}</td>
				<td>{Value}</td>
			</tr>;
		});

		result = _.compact(result);

		if ( result.length ) {
			result.unshift(<tr key = {namespace} ><td><strong>{sanitizeNamespace(namespace)}</strong></td></tr>);
		}

		return result;

	};


	return (
		<div className = 'vp_demo_page_strings'>
			<h3>Strings</h3>
			<table className = 'vp_table'>
				<tbody>
					{renderStringObject(strings, '')}
				</tbody>
			</table>
		</div>
	);
}

/*
 *	Class
 */
module.exports = React.createClass({
	render: r,
});


