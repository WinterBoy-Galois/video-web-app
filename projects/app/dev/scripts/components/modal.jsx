/*
 * Base Modal class for composing new modals
 */

var _ = require('underscore'),

	components = require('components'),

	React = require('react'),
	Button = require('components/button'),
	Forms = require('components/forms'),
	Icon = require('components/icon');


// render the page
function r() {

	var text = false;
	if ( this.props.text ) {
		text = <div className = 'vp_text'>{this.props.text}</div>;
	};

	var title = false;
	if ( this.props.title ) {
		title = <h2>{this.props.title}</h2>;
	}

	var buttons = false,
		rejectButton =this.props.rejectButton ?  <Button title = {this.props.rejectButton} onClick = {this.props.onFail} color = 'gray' /> : '',
		doneButton = this.props.confirmButton ? <Button title = {this.props.confirmButton} onClick = {this.onDone} color = {this.props.theme}/>:'';
	if ( this.props.confirmButton || this.props.rejectButton ) {
		buttons = <div className = 'vp_buttons'>
			{rejectButton}
			{doneButton}
		</div>;
	};

	var content = false;
	if ( this.props.children ) {
		content = <div>
			{this.props.children}
		</div>;
	}

	var form = false;
	if ( this.props.inputs ) {
		var inputs = _.map(this.props.inputs, function(item){
			return <Forms.Input key={item.name} {...item} />;
		});

		form = <Forms.Form
			ref = 'form'
			>
			{inputs}
		</Forms.Form>;
	}

	var closeButton = this.props.hasCloseButton ? <div className = 'vp_close_button' onClick={this.props.onFail}>&#215;</div> : '';

	return (
		<div className = {'vp_simple_modal vp_color_' + this.props.theme + ' ' + this.props.className}>
			<Icon
				type={this.props.icon} />
			{closeButton}
			{title}
			{text}
			{form}
			{this.props.children}
			{buttons}
		</div>
	);
}

var Modal = React.createClass({
	onDone: function() {
		var result = this.refs.form ? this.refs.form.getValues() : {};
		this.props.onDone(result);
	},
	render: r,
	propTypes: {
		theme: React.PropTypes.oneOf(components.constants.colors),
	    icon: React.PropTypes.oneOf(components.constants.icons),
	    title: React.PropTypes.string,
	    hasCloseButton: React.PropTypes.bool,
	    closesOnBackgroundClick: React.PropTypes.bool,
	    onDone: React.PropTypes.func,
	    onFail: React.PropTypes.func,
	    confirmButton: React.PropTypes.string,
	    rejectButton: React.PropTypes.string,
	}
});

module.exports = Modal;
