function maintainChildAspect(parent, child, aspect, fit) {
    var parentWidth = parent.width(),
        parentHeight = parent.height();

    // ios7 scrollTop bug:
    if (document.body.scrollTop) {
        parentHeight += document.body.scrollTop;
    }

    var parentAspect = parentWidth / parentHeight,

        width = 0,
        height = 0,
        marginHor = 0,
        marginVert = 0;

    if ((parentAspect < aspect && !fit) || (parentAspect > aspect && fit)) {
        height = parentHeight;
        width = parentWidth * (aspect / parentAspect);
        marginHor = (parentWidth - width) / 2;
    } else {
        width = parentWidth;
        height = parentHeight * (parentAspect / aspect);
        marginVert = (parentHeight - height) / 2;
    }

    // set all values on the element
    marginHor = marginHor + "px";
    marginVert = marginVert + "px";
    child.css("width", width + "px");
    child.css("height", height + "px");
    child.css("margin", marginVert + " " + marginHor + " " + marginVert + " " + marginHor);
}

module.exports = {
    maintainChildAspect: maintainChildAspect,
};