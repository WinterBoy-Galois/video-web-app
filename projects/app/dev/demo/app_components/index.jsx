var _ = require('underscore'),
	React = require('react'),

	config = require('./config');


function setProp(component, property, value) {
	this.state[component][property] = value;
	this.state[component]['key'] = Math.random();
	this.setState(this.state);
};


/*
 *	Template
 */
function r() {
	var folders = this.props.folders;


	// extract current	 component
	var compConfig = false;
	var Comp = 'None';
	var compProps = {};
	var compkey = '';
	try {
		compkey = folders[1];
		compConfig = config[compkey];
		Comp = compConfig.component;
		compProps = this.state[compkey];
	} catch(_){}


	// build menu of all available view
	var menu1 = 
		<div>
			<h3>Modals & Pages</h3>
			{ _.map(config, function(value, key){ 
				var name = key.replace('_', ' '),
					className = key == folders[1] ? 'vp_active' : '';
				return <span key = {key} ><a className = {className} href = {'#' + folders[0] + '/' + key } >{name}</a> | </span>; 
			})}
		</div>;

	// build menus of all available subsettings
	var _this = this;
	var subsettings = '';
	if (compConfig) {
		subsettings = 
			<div>
				<div>---</div>
				{ _.map(compConfig.props, function(value, key){ 
					if (!_.isObject(value)) return '';
					return <div key = {key}><strong key = {key}>{key}: </strong>
						{_.map(value, function(entry, entryKey){
							var className = (entry == _this.state[compkey][key] ? 'vp_active' : '');
							return <span key = {entryKey} ><a className = {className} onClick = {setProp.bind(_this, compkey, key, entry)}>{entryKey}</a> | </span>;
						})}
					</div>;
				})}
			</div>;
	}

	return (
		<div className = 'vp_demo_page'>
			{menu1}
			{subsettings}
			<div className = 'vp_app_components_content'>
				<Comp  {...compProps} />
			</div>
		</div>
	);
}

/*
 *	Class
 */
module.exports = React.createClass({
	render: r,
	getInitialState: function() {
		return _.mapObject(config, function(entry){
			return entry.defaultProps;
		});
	}
});


