var _ = require('underscore'),
	React = require('react'),

	Modal = require('components/modal'),

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

	function renderStringObject(s, namespace) {
		return _.map(s, function(Value, key) {

			if ( _.isObject(Value) && key.indexOf && key.indexOf('_modal') > 0 ) {
				var title = namespace + key;
				return <div className ='vp_demo_modal_wrapper'>
					<h4>{sanitizeNamespace(title)}</h4>
					<Modal {...Value} className = 'vp_alert_modal' />
				</div>;
			} else if ( _.isObject(Value) ) {
				return renderStringObject(Value, namespace + key + '.');
			}

			return false;
		});
	};

	return (
		<div className = 'vp_demo_page_modals'>
			<h3>Simple Modals</h3>
			{renderStringObject(strings, '')}
		</div>
	);
}

/*
 *	Class
 */
module.exports = React.createClass({
	render: r,
});


