
function zeroPadding(num, size) {
	var s = num + "";
	while (s.length < size) {
		s = "0" + s;
	}
	return s;
}

function secToMinSecString(secs) {
	secs = Math.floor(secs);
	var mins = this.zeroPadding(Math.floor(secs / 60), 2);
	secs = this.zeroPadding(secs % 60, 2);
	return mins + ":" + secs;
}

module.exports = {
	zeroPadding,
	secToMinSecString
};
