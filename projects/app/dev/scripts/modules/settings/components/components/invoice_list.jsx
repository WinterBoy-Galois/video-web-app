var React = require('react'),
	
	// strings
	s = require('strings')('settings.plans_change'),

	BackboneMixin = require('mixins/backbone'),

	Button = require('components/button'),
	Tables = require('components/tables');

function rEntry(invoice) {
	var d = new Date(invoice.get("date"));
	return (
		<Tables.Body key = {invoice.cid} >
			<tr>
				<td>{invoice.get('number')}</td>
	    		<td>{ (invoice.get("amount_due") / 100) + ' ' + invoice.get('currency')}</td>
	    		<td>{d.toLocaleDateString()}</td>
	    		<td>
					<Button 
		    			title='view' 
		    			icon='view' 
		    			color='lightblue'
		    			onClick={window.open.bind(null, invoice.get('download_url'))}/>	
	    		</td>
	    	</tr>
		</Tables.Body>
	);
}

function r() {

	if ( this.props.invoices.length == 0 ) {
		return <div><p>You currently do not have any invoices to list.</p></div>;
	}

	return (
		<div>
		<Tables.Table>
			<Tables.Header>{['No.', 'Amount', 'Date']}</Tables.Header>
				{this.props.invoices.map(rEntry.bind(this))}
			</Tables.Table>
		</div>
		);
}


module.exports = React.createClass({
	render: r,

	mixins: [BackboneMixin],

	backboneProps: ['invoices'],

	propTypes: {
	    invoices: BackboneMixin.PropTypes.Collection.isRequired,
	},

});