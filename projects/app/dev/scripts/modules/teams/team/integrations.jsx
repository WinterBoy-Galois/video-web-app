var React = require('react'),
	s = require('strings')('teams.team'),
	
	// mixins
	BackboneMixin = require('mixins/backbone'),
	
	// components
	AppPage = require('components/app_page'),
	Button = require('components/button'),
	Forms = require('components/forms'),
	Tables = require('components/tables'),

	// operations
	addIntegration = require('app/operations/addIntegration'),
	removeIntegration = require('app/operations/removeIntegration');

	

// render on of the entries
function rEntry(ig) {

	var key = ig.get('id');

	var addButton = <Button disabled={!this.props.editable} title ='Connect' style = 'outlined' onClick = { addIntegration.bind(this, {'integration': ig}, {accessScope:this.props.team})}/>,
		removeButton = <Button disabled={!this.props.editable} title = "Disconnect" style = 'outlined' color='orange' icon='delete' onClick = { removeIntegration.bind(this, {'integration': ig})} />;

    return (
    	<Tables.Body key = {key} >
	    	<tr>
	    		<td>{ig.get('title')}</td> 
	    		<td>{ig.get('configured') ? 'Connected' : 'Not integrated'}</td>
	    		<td rowSpan = '2'>{ig.get('configured') ? removeButton : addButton}</td>
	    	</tr>
	      <tr>
	      	<td colSpan='2' className = 'vp_detail'>{ig.get('description')}</td>
	      </tr>
    	</Tables.Body>
    );
}


function r() {
	return (
		<div>
			<h2>Integrations</h2>
			<Tables.Table>
				{this.props.integrations.map(rEntry.bind(this))}
			</Tables.Table>
		</div>
	);
};


module.exports = React.createClass({
	mixins: [BackboneMixin],
	render: r,
	componentDidMount: function(){
		this.props.integrations.fetch();
	},
	backboneProps: ['team', 'integrations'],
	propTypes: {
		integrations: BackboneMixin.PropTypes.Collection.isRequired,
	    team: BackboneMixin.PropTypes.Model.isRequired,
	},
});




