var Controller = require('shared/controllers/controller'),
    lib_loader = require('_old/util/lib_loader'),
    View = require('./view');


module.exports = Controller.extend({

    buildRootView: function() {
        return new View({
            model: this.options.content
        });
    },

    onRootViewShow: function() {
        this.setupSubmit();
    },

    setupSubmit: function() {
        this.listenTo(this.rootView, 'submit', function(val) {
            this.validateAndUpdateAddress(val);
        }.bind(this));

        this.listenTo(this.rootView, 'zoom_changed', function(zoom) {
            this.options.content.set({
                zoom: zoom
            });
            this.trigger("changed");
        });

        this.listenTo(this.rootView, 'center_changed', function(center) {
            this.options.content.set({
                lat: center.A,
                lng: center.F
            });
            this.trigger("changed");
        });
    },

    validateAndUpdateAddress: function(val) {
        var _this = this;
        lib_loader.requireLib("google_maps", function(maps) {
            var geocoder = new maps.Geocoder();
            geocoder.geocode({
                'address': val
            }, function(results, status) {
                if (status == document.google.maps.GeocoderStatus.OK) {
                    var address = results[0].formatted_address;
                    var location = results[0].geometry.location;
                    _this.options.content.set({
                        title: address,
                        zoom: 8,
                        lat: location.A,
                        lng: location.F
                    });
                    _this.trigger("changed");
                } else {
                    _this.rootView.triggerLocationError();
                }
            });
        });
    },

});