var _ = require('underscore'),
	React = require('react'),
	DatePicker = require('react-datepicker'),
    PhoneInput = require("react-phone-number-input"),
    reactDateSelect = require("@srph/react-date-select");

require('react-datepicker/dist/react-datepicker.css');
require('react-phone-number-input/style.css');

/* 
 * Select version
 */
var Select = React.createClass({
	render: function() {
		function renderOption(value,key){
			return <option key={key} value={key} >{value}</option>;
		};
		return (
			<select 
				ref='element'
				{...this.props}>
				{_.map(this.props.options, renderOption)}
			</select>
		);
	}
});

/* 
 *Input
 */
var Input = React.createClass({
	render: function() {
		return <input ref='element' {...this.props} />;
	}
});

var TextArea = React.createClass({
	render: function() {
		return <textarea ref='element' {...this.props} />;
	}
});

var DateInput = React.createClass({
	render: function() {
		return 	(
			<DatePicker 
				ref='element' 
				disabled={this.props.disabled}
				maxDate={this.props.maxDate}
				minDate={this.props.minDate}
				onChange={this.props.onChange}
				selected={this.props.defaultValue}
                />
		);
	}
});

var DateSelect = React.createClass({
    getInitialState: function() {
        if (typeof this.props.defaultValue !== "undefined" &&
            this.props.defaultValue != null &&
            this.props.defaultValue.length > 1) {

            var parsed = new Date(this.props.defaultValue);
            var month = parsed.getMonth() + 1;
            month = ""+month;
            if (month.length == 1) month = "0"+month;
            return {y: parsed.getFullYear(), m: month, d: parsed.getDate()};
        }
        return {y: this.props.maxYear, m: 0, d:0};
    },
    handleYearChange : function(value) {
        this.setState({ y: value },() => { this.props.onChange(this.state); });
    },

    handleMonthChange: function(value) {
        this.setState({ m: value },() => { this.props.onChange(this.state); });
    },

    handleDayChange: function (value) {
        this.setState({ d: value },() => { this.props.onChange(this.state); });
    },

	render: function() {
		return 	(
        <div ref='element'>
        <div style={{display:'inline-block'}}>
            <reactDateSelect.MonthSelect placeholder='Month' value={this.state.m} onChange={this.handleMonthChange} style={{width:'130px'}}/>
            <reactDateSelect.DaySelect placeholder='Day' month={1} value={this.state.d} onChange={this.handleDayChange} style={{width:'70px', marginLeft:'20px'}} />
			<reactDateSelect.YearSelect placeholder='Year' start={1910} end={this.props.maxYear} value={this.state.y} onChange={this.handleYearChange} style={{width:'80px', marginLeft: '20px'}} />
        </div>
        </div>
		);
	}
});

var Phone = React.createClass({
	render: function() {
		return 	(
			<PhoneInput placeholder="Enter phone number"
                style={{lineHeight:'0.1'}}
				onChange={this.props.onChange}
                value={this.props.defaultValue}
            />
		);
	}
});

var typeMap = {
	'text': Input,
    'textarea': TextArea,
	'password': Input,
	'checkbox':Input,
	'email': Input,
	'date': DateInput,
	'dateselect': DateSelect,
	'select': Select,
    'phone': Phone
};


/*
 *	Template
 */
function r() {

	var errorDetail = '';
	if ( this.props.error && this.props.type != 'checkbox' ) {
		errorDetail = <div className = 'vp_error_detail'>{this.props.error}</div>;
	}

	var Input = typeMap[this.props.type];
	var required = this.props.required ? <span className='vp_required'>*</span>:'';
	
	function onChange(val) {
		this.currentValue = val;
		this.props.onChange && this.props.onChange(val);
	}

	return (
		<div className = {'vp_input vp_' + this.props.type + (this.props.error ? ' vp_error' : '')}>
			<label>
				{this.props.label}{required}
			</label>
			<Input 
				{...this.props}
				onKeyDown={this.onKeyDown}
				ref = 'input' 
				onChange={onChange.bind(this)}
				/>
			{errorDetail}
		</div>
	);
}
 
module.exports = React.createClass({
	render: r,
	value: function(){
		var el = this.refs.input.refs.element;
		if ( this.props.type == 'checkbox') {
			return el.checked;
		} else if ( this.props.type =='date' || this.props.type == 'phone') {
			return this.currentValue;
        } else if ( this.props.type == 'dateselect') {
            if (typeof this.currentValue !== 'undefined' && this.currentValue != null && 
                typeof this.currentValue !== 'string') {
                var m = this.currentValue.m;
                var y = this.currentValue.y;
                var d = this.currentValue.d;
                if (d.length == 1) {
                    d = "0" + d;
                }
                return y+"-"+m+"-"+d;
            }
            return this.currentValue;
        }
		return el.value;
	},
	componentDidMount: function(){
		this.currentValue = this.props.defaultValue;
	},
	getDefaultProps: function() {
	    return {
	      type: 'text'
	    };
  	},
	onKeyDown: function(e) {
		if ( e.keyCode == 13 && this.props.onEnter) {
			this.props.onEnter();
		}
	},
	propTypes: {
	    type: React.PropTypes.oneOf(['text', 'textarea', 'password', 'email', 'checkbox', 'select', 'date', 'dateselect', ,'phone']),
	    label: React.PropTypes.node,
	    placeholder: React.PropTypes.string,
	    onEnter:  React.PropTypes.func,
	    error: React.PropTypes.string,
	    required: React.PropTypes.bool,
	}
});





