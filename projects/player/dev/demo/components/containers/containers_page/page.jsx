var _ = require('underscore'),
	env = require('util/environment').detect(),
	React = require('react'),
	config = require('./config'),
	Menu = require('../../components/menu');


// collect all possible props keys
var containerKeys = _.keys(config);


/*
 *	Template
 */
function r() {

	var containerName = this.props.path[1];
	if (!config[containerName]) containerName = 'engine';

	var containerConfig = config[containerName],
		Container = containerConfig.component,
		propKeys = _.extend({}, containerConfig.defaultProps, this.props.containerPropertys),
		containerProps = _.mapObject(propKeys, function(value, key){
			return containerConfig.props[key][value];
		});



	// build menus of all available subsetting
	var _this = this;
	var subsettings = _.map(containerConfig.props, function(value, key){ 
		if ( value.length <= 1 ) return false;
		return <Menu
			key={key}
			title={key}
			values={_.keys(value)}
			onChange = {_this.onPropChange.bind(_this, containerName, key)}
			current={propKeys[key]}/>;
	});


	var container;
	// if there is a control element involved
	// wrap component into it
	if (containerConfig.controllComponent) {
		var ControlComp = containerConfig.controllComponent;
		container = <ControlComp 
			{...this.props}
			compProps = {containerProps}
			component = {Container}
			/>;

	} else {
		container = <Container  {...containerProps} />;
	}


	return (
		<div onDoubleClick={this.onDoubleClick}>
			<Menu
				onChange={this.onMenuChange}
				title='Container'
				values={containerKeys}
				current={containerName}/>
			{subsettings}
			<div className = {'vp_app_containers_content ' + ( this.state.expanded?'vp_expanded': '')}>
				{container}
			</div>
		</div>
	);
}

/*
 *	Class
 */
module.exports = React.createClass({
	render: r,
	onPropChange: function(container, property, value) {
		this.props.onContainerPropertyChanged(container, property,value);
	},
	onMenuChange: function(key){
		this.props.onContainerChanged(key);
	},
	getInitialState: function() {
		return {
			expanded:env.isIPhone
		};
	}

});


