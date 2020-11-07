var _ = require('underscore'),
	$ = require('jquery'),

	React = require('react'),

	Modal = require('components/modal');


function onModalDone(key, result) {
	result = result || true;
	removeModal.bind(this)(key, result);
};

function onModalFail(key) {
	removeModal.bind(this)(key, false);
};

function removeModal(key, result) {
	
	if ( key < 0 ) return;
	var dfd = this.state.deferreds[key];

	this.setState({
		modals:_.without(this.state.modals, this.state.modals[key]),
		deferreds: _.without(this.state.deferreds, this.state.deferreds[key])
	});

	setTimeout(function(){
		if ( result ) {
			dfd.resolve(result);
		} else {
			dfd.reject();
		}
	},10);
	
};

function stopProp(e) {
	e.stopPropagation();
};

// wrap each modal in a container 
function wrapModal(component, index) {

	var component = React.cloneElement(component, {
		'onDone': onModalDone.bind(this, index), 
		'onFail': onModalFail.bind(this, index),
	});

	return (
		<div key = {index} className = 'vp_app_modal_container'>
			<div className = 'vp_app_modal' onClick={stopProp}>
				{component}
			</div>
		</div>
	);
};

// on background click close the topmost modal
// disabled for now
function onBackgroundClicked() {
	return;
	if (!_.last(this.state.modals).props.closesOnBackgroundClick)
		return;
	removeModal.bind(this)(this.state.modals.length-1, false);
};


// render the page
function rModals() {
	return (
		<div id='vp_app_modals'>
			<div className='vp_modal_background' onClick={onBackgroundClicked.bind(this)}>
				{_.map(this.state.modals, wrapModal.bind(this))}
			</div>
		</div>
	);
}

var Modals = React.createClass({

	render: rModals,

	getInitialState: function(){
		return {
			modals:[],
			deferreds: []
		};
	},

	/* 
	 * Simple confirm and alert
	 */
	confirm: function(args, args2) {
		if (!args.rejectButton) {
			args.rejectButton = 'Cancel';
		}
		return this.alert(args, args2);
	},

	alert: function(args, args2) {
		if (!args.confirmButton) {
			args.confirmButton = 'OK';
		}
		args.className = 'vp_alert_modal';
		if (args2) {
			args = _.extend(args, args2);
		}
		return this.showModal(<Modal {...args} />);
	},

	/*
	 * Attach a new modal and receive a promise for the result
	 */
	showModal: function(component) {
		var dfd = new $.Deferred();
		this.setState({
			modals:this.state.modals.concat(component),
			deferreds: this.state.deferreds.concat([dfd])
		});
		return dfd.promise();
	}

});

module.exports = Modals;