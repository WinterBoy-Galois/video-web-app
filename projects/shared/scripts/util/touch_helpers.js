function touchE(e) {
    var t = e.touches || (e.originalEvent && e.originalEvent.touches);
    return t && t.length && t[0];
}

function touchX(e) {
    var t = touchE(e);
    return t && t.clientX;
}

function touchY(e) {
    var t = touchE(e);
    return t && t.clientY;
}

function originalTouchX(e) {
    return e.originalEvent && touchX(e.originalEvent);
}

module.exports = {
    touchX: touchX,
    touchE: touchE,
    touchY: touchY,
    originalTouchX: originalTouchX
};