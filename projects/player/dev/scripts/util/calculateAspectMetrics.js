
module.exports = function(parentWidth, parentHeight, aspect, fit) {

    parentHeight = parentHeight || 0;
    parentWidth = parentWidth || 0;

    var parentAspect = parentWidth / parentHeight,
        left = 0,
        top = 0,
        width = 0,
        height = 0;

    if ((parentAspect < aspect && !fit) || (parentAspect > aspect && fit)) {
        height = parentHeight;
        width = Math.floor(parentWidth * (aspect / parentAspect));
        left = Math.floor((parentWidth - width) / 2);
    } else {
        width = parentWidth;
        height = Math.floor(parentHeight * (parentAspect / aspect));
        top = Math.floor((parentHeight - height) / 2);
    }
    
    return {
        left:isNaN(left) ? 0 : left,
        top:isNaN(top) ? 0 : top,
        width:isNaN(width) ? 0 : width,
        height:isNaN(height) ? 0 : height,
    };
};
