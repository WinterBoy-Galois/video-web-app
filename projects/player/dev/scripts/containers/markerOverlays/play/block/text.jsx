var React = require('react'),
	PureRenderMixin = require('react-addons-pure-render-mixin');


var TextBlock = function(props) {
	return <div dangerouslySetInnerHTML={{__html:props.text}} />;
};

TextBlock.propTypes = {
	text:React.PropTypes.string.isRequired,
};

/*
 *	Class
 */
module.exports = TextBlock;



