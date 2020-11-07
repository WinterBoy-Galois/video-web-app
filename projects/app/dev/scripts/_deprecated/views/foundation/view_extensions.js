var $ = require('jquery'),
    Marionette = require('marionette');


var extensions = {

    // routing
    route: function(route) {
        Marionette.App.route(route);
    },

    // manage loading indicator
    setBusy: function(busy) {

        if (!this.busyCount) { 
            this.busyCount = 0;
        }

        if (busy) {
            this.busyCount++;
            if (this.busyCount === 1) {
                this.$el.after('<div class ="loading page_loading"><div class="loading_small"></div></div>');
                this.$el.addClass("page_busy");
            }
        } else {
            this.busyCount--;
            if (this.busyCount <= 0) {
                $(".page_loading").remove();
                this.$el.removeClass("page_busy");
            }
        }
    },


    consumeEvent: function(e) {
        e.stopImmediatePropagation();
    },


    setupTooltips: function() {

        var conf = {
            animation: "fade",
            position: "top",
            maxWidth: 200,
            delay: 500
        };

        this.$el.find('.tt-top, .info_bubble').tooltipster(conf);

        conf.position = "left";
        this.$el.find('.tt-left').tooltipster(conf);
    },

    zeroPadding: function(num, size) {
        var s = num + "";
        while (s.length < size) {
            s = "0" + s;
        }
        return s;
    },

    secToMinSecString: function(secs) {
        secs = Math.floor(secs);
        var mins = this.zeroPadding(Math.floor(secs / 60), 2);
        secs = this.zeroPadding(secs % 60, 2);
        return mins + ":" + secs;
    }


};


module.exports = extensions;