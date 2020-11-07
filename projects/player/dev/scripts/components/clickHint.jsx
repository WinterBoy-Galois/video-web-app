require('css/components/clickHint.scss');

var tinycolor = require('tinycolor'),
	React = require('react');

/*
 *	Template
 */
function ControlButtonPlay(props) {

	var tColor = tinycolor(props.color),
		shadowColor = tColor.isLight() ? tColor.darken(50) : tColor.lighten(50);

	var textStyle = {
		color:props.color,
		textShadow: '0.5px 0.5px ' + shadowColor + 
					', -0.5px 0.5px ' + shadowColor + 
					', 0.5px -0.5px ' + shadowColor +
					', -0.5px -0.5px ' + shadowColor
	};

	return (
		<div className = 'vpp_click_hint'>
			<svg  viewBox="0 0 100 50" >
			<g><path stroke={shadowColor} fill={props.color} d="M92.602,23.838c-4.917,12.668-28.499,17.385-43.297,15.759C33.737,37.889,22.436,24.553,19.92,12.356
			c3.585,1.411,6.895,3.253,10.395,4.883c3.285,1.532,6.049-2.23,2.881-3.958C27.774,10.32,22.503,7.553,18.501,3.243
			c-1.041-1.123-2.981-0.834-4.079-0.152C9.634,6.069,5.891,9.903,1.541,13.27c-2.631,2.034,1.447,5.514,4.087,3.475
			c2.827-2.187,5.399-4.572,8.171-6.79C15.515,25,29.442,42.667,49.244,44.294c17.73,1.458,43.061-3.91,48.918-19.003
			C99.27,22.435,93.708,20.991,92.602,23.838z"/></g>
			</svg>
			<span style={textStyle}>Click Me</span>
		</div>
	);
};

ControlButtonPlay.defaultProps = {
	color:'white'
};




/*
 *	Class
 */
module.exports = ControlButtonPlay;


