var React = require('react'),

	AjaxStateMixin = require('mixins/ajax_state'),

	LoadingIndicator = require('./loadingIndicator');

/*
 * Optional back button
 */
function goBack() {
	window.history.back();
}
var backButton =  <a className="vp_history_back_button" onClick={goBack}>Back</a>;

/*
*	Sizes
*/
var sizes = {
	'small': 'vp_small',
	'large': 'vp_large',
	'medium': 'vp_medium',
	'xlarge': 'vp_xlarge'
};

/*
 *	Template
 */
function r() {

	var pageClass = 'vp_app_page ' + (sizes[this.props.size] || '') + ' ' + this.props.className,
		loadingIndicator = <div className='vp_page_loading_indicator'><LoadingIndicator expanded={false}/></div>;

	return (
		<div className = {pageClass} onClick={this.props.onClick}>
            {this.props.title != "" &&
                <header>
                    {this.props.hasBackButton ? backButton : ''}
                    <h1>{this.props.title}</h1>
                </header>
            }
			<div className = 'vp_app_sheet_above'>
				{this.props.compAboveSheet}
			</div>
			<div className = 'vp_app_sheet'>
				{ (this.props.hasLoadingIndicator && this.state && this.state.ajax_loading) ? loadingIndicator : ''}
				{this.props.children}
			</div>
			<div className = 'vp_app_sheet_below'>
				{this.props.compBelowSheet}
			</div>
		</div>
	);
}

/*
 *	Class
 */
module.exports = React.createClass({
	mixins: [AjaxStateMixin],
	render: r,
	propTypes: {
	    hasBackButton: React.PropTypes.bool,
	    title: React.PropTypes.string,
	    size: React.PropTypes.oneOf(['small', 'medium', 'large', 'xlarge']),
	    hasLoadingIndicator: React.PropTypes.bool,
	},
});



