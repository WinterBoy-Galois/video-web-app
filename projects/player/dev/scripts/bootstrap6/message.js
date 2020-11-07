
/*
 * Dom References
 */
var vppMessage = document.getElementById('vpp_bootstrap_message');

module.exports = {
	setText:function(text){
		vppMessage.style.display = "inline-block";
		vppMessage.textContent = text;
	}
};