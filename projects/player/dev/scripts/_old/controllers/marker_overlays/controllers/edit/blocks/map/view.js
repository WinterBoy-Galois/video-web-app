var Marionette = require('marionette'),
    lib_loader = require('_old/util/lib_loader'),
    template = require('./view.html');


module.exports = Marionette.LayoutView.extend({

    template: template,
    className: "vp_map",

    bindings: {
        ".vp_gmap": {
            observe: ["lat", "lng", "zoom", "title"],
            update: function() {
                this.updateMapFromModel();
            }
        },
        ".vp_input_address": {
            observe: "title",
            updateView: function(val) {
                this.ui.input.val(val);
            },
            // stop updating model!
            updateModel: function() {}
        }

    },

    ui: {
        "gmap": ".vp_gmap",
        input: ".vp_input_address",
    },

    events: {
        "click input, keypressed input": "onInputClick"
    },

    behaviors: {
        SelfTest: {},
        Stickit: {},
        Form: {
            inputGroupSubmit: '.vp_submit_button'
        }
    },

    onShow: function() {
        var _this = this;
        setTimeout(function() {
            _this.loadMap();
        }, 20);
        this.ui.input.tooltipster({
            content: "Google Maps was not able to find this address.",
            trigger: "custom",
            position: "bottom"
        });
    },

    loadMap: function() {
        var _this = this;
        lib_loader.requireLib("google_maps", function(maps) {
            /*var mapOptions = {
                center: {
                    lat: 52.5167,
                    lng: 13.3833
                },
                zoom: 8
            };*/
            _this.gmap = new maps.Map(_this.ui.gmap[0], {});
            _this.gmapMarker = new document.google.maps.Marker({
                map: _this.gmap,
                animation: document.google.maps.Animation.DROP,
                draggable: true
            });
            _this.updateMapFromModel();


            maps.event.addListener(_this.gmapMarker, "dragend", function() {
                _this.trigger("center_changed", _this.gmapMarker.position);
            });

            maps.event.addListener(_this.gmap, "bounds_changed", function() {
                var zoom = _this.gmap.getZoom();
                _this.trigger("zoom_changed", zoom);
            });

        });
    },

    updateMapFromModel: function() {
        try {
            this.ui.input.tooltipster("hide");
        } catch (ignore) {}

        if (this.gmap) {

            //var zoom = this.model.get("zoom") || 8;
            var center = {
                lat: this.model.get("lat") || 52.5167,
                lng: this.model.get("lng") || 13.3833
            };


            this.gmap.setZoom(this.model.get("zoom") || 8);
            this.gmap.panTo(center);

            this.gmapMarker.setPosition(center);
            this.gmapMarker.setTitle(this.model.get("title"));
        }
    },

    triggerLocationError: function()  {
        this.ui.input.tooltipster("show");
    },

    onInputClick: function() {
        this.ui.input.tooltipster("hide");
    }

});