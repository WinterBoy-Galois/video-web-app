var Block = require('./block'),
    lib_loader = require('_old/util/lib_loader');

require('stickit');


module.exports = Block.extend({

    template: '<div><div class = "vp_map_wrapper"><div class = "vp_gmap"></div></div></div>',
    className: "vp_content_block vp_content_block_map",

    bindings: {},

    behaviors: {
        SelfTest: {},
        Stickit: {}
    },

    ui: {
        "gmap": ".vp_gmap"
    },

    onShow: function() {
        var _this = this;
        setTimeout(function() {
            _this.setupMap();
        }, 20);
    },

    setupMap: function() {
        var _this = this;
        lib_loader.requireLib("google_maps", function(maps) {

            var mapOptions = {
                center: {
                    lat: _this.model.get("lat") || 52.5167,
                    lng: _this.model.get("lng") || 13.3833
                },
                zoom: _this.model.get("zoom") || 8
            };

            _this.gmap = new maps.Map(_this.ui.gmap[0], mapOptions);
            _this.gmapMarker = new document.google.maps.Marker({
                position: mapOptions.center,
                map: _this.gmap,
                animation: document.google.maps.Animation.DROP,
                title: _this.model.get("title") || ""
            });

        });
    }

});