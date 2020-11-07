var React = require('react'),
	LoadingIndicator = require('./loadingIndicator');


var PageSection = function(props) {

	var titleDiv = false;

	if (props.title) {
		titleDiv = <div className = 'vp_section_title'>
				<span>{props.title}</span>
			</div>;
	}

	return (
		<div>
			{titleDiv}
			<div 
				className = {'vp_page_section ' + (props.background?'vp_background': '') }>
				{props.children}
				<div className = 'vp_clear' />
				<LoadingIndicator expanded visible={props.loading}/>
			</div>
		</div>
	);

};

PageSection.propTypes = {
	title: React.PropTypes.string,
	background:React.PropTypes.bool,
	loading:React.PropTypes.bool
};

PageSection.defaultProps = {
	background: true,
	loading: false
};

module.exports = PageSection;


