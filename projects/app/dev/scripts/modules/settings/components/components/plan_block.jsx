var _ = require('underscore'),
	React = require('react'),
	
	// strings
	s = require('strings')('settings.card_info'),

	Button = require('components/button'),

	routeOp = require('app/operations/route'),
	UnsubscribeUserOp = require('app/operations/unsubscribeUser');

var rFeature = function(f,index) {
	var className = '';
	if (f.charAt(0) == '!') {
		className = 'vp_feature_title';
		f = f.substring(1);
	}
	return <div key={index} className = {className}>{f}</div>;
};

module.exports = function(props) {
	var c = props.config,
		button = false;

	if ( c.button == 'contact_us' ) {
		button = <Button 
					onClick={window.open.bind(this,'mailto:sales@videopath.com?subject=Enquiry about Videopath '+c.title + ' Plan')}
					color='blue'
					title = 'Contact us'
					icon = 'social_email'/>;
	} else if ( c.button == 'current' ) {
		button = <Button 
					disabled
					color='blue'
					title = 'Current Plan'
					icon = 'checkmark'/>;
	} 
	else if (c.button == 'subscribe'){
		button = <Button 
					onClick={routeOp.bind(this, {route:'settings/plans/change/' + c.id})}
					title = 'Subscribe'
					icon = 'diamond'
					color = 'blue'
				/>;
	} 
	else if (c.button == 'downgrade') {
		button = <Button 
				onClick={UnsubscribeUserOp}
				title = 'Downgrade'
				icon = 'x'
				color = 'red'
			/>;
	}

	return <div className = 'vp_plan_block'>
		<div className = 'vp_head'>
			<h2>{c.title}</h2>
			<div className = 'vp_price'>{c.price}</div>
			{button}
		</div>
		<div className = 'vp_features'>
			{_.map(c.features, rFeature) }
		</div>
	</div>;
};

