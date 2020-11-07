module.exports = {

    setEndscreenMargins: function(view, offset) {
        if (!view.ui.footerBlock.outerHeight) {
            return;
        }

        offset = offset || 0;

        var minMargin = 20,
            marginBottom = 20,
            fH = view.ui.footerBlock.outerHeight(),
            bH = view.ui.centerArea.outerHeight(),

            marginStatic = fH + bH + marginBottom + offset,
            computedMargin = (window.innerHeight - bH) / 2 - offset;

        computedMargin = Math.max(computedMargin, minMargin);

        if (marginStatic + computedMargin < window.innerHeight) {
            view.ui.centerArea.css("margin-top", computedMargin + "px");
        } else {
            view.ui.centerArea.css("margin-top", minMargin + "px");
        }

        if (marginStatic + minMargin < window.innerHeight) {
            view.$el.removeClass('vp_static');
        } else {
            view.$el.addClass('vp_static');
        }

        view.ui.centerArea.removeClass('vp_hidden');
    }
};