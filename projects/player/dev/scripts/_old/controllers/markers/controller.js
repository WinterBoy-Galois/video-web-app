var $ = require('jquery'),
    _ = require('underscore'),
    Backbone = require('backbone'),
    Controller = require('shared/controllers/controller'),
    timestring_helpers = require('_old/util/timestring_helpers'),
    CollectionFactory = require('./util/markers_view_collection_factory'),
    special_marker_model_factory = require('./util/special_marker_view_model_factory'),
    layout_model_factory = require('./util/layout_view_model_factory'),
    marker_delete_helper = require('./util/delete_marker_modal_helper'),
    marker_add_helper = require('./util/add_marker_modal_helper'),
    LayoutView = require('./views/layout'),
    MarkerView = require('./views/marker'),
    MarkersView = require('./views/markers'),
    InfoArrowView = require('./views/info_arrow');


module.exports = Controller.extend({

    showInfoArrow: true,
    preventClicks: false,
    previousOpenMarker: null,

    views: {

        "rootView": {
            events: {
                "click": function() {
                    this.options.api.command('toggle_play');
                }
            }
        },

        // the view containing our collection
        // of markers
        "markersView": {
            factory: function(c) {
                c.viewCollection = CollectionFactory.create(c.options.video, c.options.playerState);
                return new MarkersView({
                    collection: c.viewCollection,
                    video: c.options.video
                });
            },
            events: {
                "child:click": function(child, id) {
                    if (!this.preventClicks) {
                        this.options.api.command("show_marker_content", id);
                    }
                }
            },
            region: "marker_collection",
        },

        'infoArrowView': {
            region: 'infoArrow',
            factory: function() {
                return new InfoArrowView({
                    model: new Backbone.Model()
                });
            }
        },

        'addMarker': {
            region: 'addMarker',
            factory: function(c) {
                var model = special_marker_model_factory.createAddMarker(c.options.playerState);
                return new MarkerView({
                    model: model
                });
            }
        },

        'brandedMarker': {  
            region: 'brandedMarker',
            factory: function(c) {
                var model = special_marker_model_factory.createBrandedMarker(c.options.playerState, c.options.video);
                return new MarkerView({
                    model: model
                });
            },
            events: {
                'click': function(){
                   window.open("https://videopath.com");
                }
            }
        }

    },

    buildRootView: function() {
        this.viewModel = layout_model_factory.create(this.options.playerState, this.options.video);
        return new LayoutView({
            model: this.viewModel
        });
    },

    onRootViewShow: function() {

        this.setupStateConnection();
        this.setupDragListeners();
        this.setupInfoArrow();

        // on reduced ui,
        // do not fade this view in

        var _this = this;
        if (this.options.playerState.get("reduced_ui")) {
            _this.listenTo(this.options.playerState, "change:reduced_ui", function() {
                _this.rootView.$el.removeClass("vp_hidden");
            });
        } else {
            // fade in complete thing after a short delay
            setTimeout(function() {
                _this.rootView.$el.removeClass("vp_hidden");
            }, 1000);
        }


        // set markers to equal lengths
        this.listenTo(this.options.video, "change:ui_equal_marker_lengths", function() {
            _this.updateMarkerLengths();
        });
        this.listenTo(this.options.playerState, "change:open_marker", function() {
            _this.updateMarkerLengths();
        });
        _this.updateMarkerLengths();

    },

    updateMarkerLengths: function() {
        var _this = this;
        setTimeout(function() {
            _this.rootView.$el.find(".vp_markers_collection_wrapper .vp_title").css("min-width", "0px");

            if (_this.options.video.get("ui_equal_marker_lengths")) {
                var maxWidth = 0;
                _this.rootView.$el.find(".vp_markers_collection_wrapper .vp_title").each(function(id, el) {
                    var width = $(el).width();
                    maxWidth = maxWidth > width ? maxWidth : width;
                });
                _this.rootView.$el.find(".vp_markers_collection_wrapper .vp_title").css("min-width", maxWidth + "px");
            }

        }, 200);
    },

    setupDragListeners: function() {

        
        var context = {};
        var view = this.views.markersView,
            playerState = this.options.playerState;

        function valuesFromPosition(position) {
            var result = {};
            var duration = playerState.get("duration");
            result.offset = position.top / context.parentHeight;
            result.seconds = duration * result.offset;
            result.timestring = timestring_helpers.secondsToString(result.seconds);
            result.draggingMarkerID = context.draggingMarkerID;
            return result;
        }

        // **** regular markers ***

        this.listenTo(view, "child:start_drag", function(child) {
            context.parentHeight = this.rootView.$el.height();
            context.draggingMarkerID = child.model.get("id");
            this.options.api.command("pause");
        });

        this.listenTo(view, "child:drag", function(child, position) {
            var v = valuesFromPosition(position);
            child.model.set({
                temp_title: v.timestring
            });
            if (position.left > 20) {
                child.model.set({
                    temp_title: "Delete"
                });
            }
        });

        this.listenTo(view, "child:end_drag", function(child, position) {
            child.model.unset("temp_title");
            var v = valuesFromPosition(position);

            // save new value in to marker object
            var marker = this.options.video.markers.get(child.model.get("id"));
            marker.set({
                time: v.seconds
            });

            // sort markers
            this.options.video.markers.sort();

            // prevent marker clicks directly after dragging
            this.preventClicks = true;
            var _this = this;
            setTimeout(function() {
                _this.preventClicks = false;
            }, 100);

            // Ask for marker delete if draged far enough
            if (position.left > 20) {
                marker_delete_helper.confirmMarkerDelete(this.options, context.draggingMarkerID);
            }

            // save changes
            this.options.video.save(false, {
                nested:true,
                onlyDirty:true
            });
            
        });


        // *** add marker marker ****

        var addView = this.views.addMarker;
        var model = this.views.addMarker.model;

        this.listenTo(addView, "start_drag", function() {
            context.parentHeight = this.rootView.$el.height();
        });

        this.listenTo(addView, "drag", function(position) {
            var v = valuesFromPosition(position);
            model.set({
                temp_title: v.seconds >= 0 ? ("Add Marker at " + v.timestring) : ""
            });
        });

        this.listenTo(addView, "end_drag", function(position) {
            var v = valuesFromPosition(position);

            // briefly fade add marker out and in
            addView.fadeOut();

            // add a new marker at the right time!
            if (v.seconds >= 0) {
                marker_add_helper.confirmMarkerCreate(this.options, v.seconds);
            }

            // move add marker back to top
            setTimeout(function() {
                addView.fadeIn();
                addView.$el.css("top", "");
                model.set({
                    temp_title: ""
                });
            }, 1000);

        });


        // *** touch support for selecting marker ***

        var _this = this;
        var extendedMarker;

        var checkPosOnMarker = function(e) {

            var maxDist = 25,
                nearestDist = 9999,
                t = e.originalEvent.touches[0],
                y = (t && t.clientY) || 0,
                value, dist, marker;

            if (y === 0) {
                return null;
            }

            for (var key in context.markerMap) {
                value = context.markerMap[key];
                dist = Math.abs(y - value);

                if (dist < maxDist && dist < nearestDist) {
                    nearestDist = dist;
                    marker = key;
                }
            }

            return marker;
        };

        var updateTouchedMarker = _.throttle(function(e) {
            var marker = null;

            // find the nearest marker to the touch
            // event
            if (e) {
                marker = checkPosOnMarker(e);

                if (marker) {
                    marker = _this.viewCollection.get(marker);
                }
            }

            if (marker === extendedMarker) {
                return;
            }

            if (extendedMarker) {
                extendedMarker.set({
                    shifted: false
                });
            }
            if (marker) {
                marker.set({
                    shifted: true
                });
            }
            extendedMarker = marker;

        }, 100);


        var lastTouch = null;

        this.listenTo(this.views.rootView, "touch_start", function(e) {
            context.markerMap = {};
            // build a map of markers
            this.views.markersView.children.each(function(view) {
                context.markerMap[view.model.get("id")] = view.$el.offset().top;
            });
            lastTouch = e;
            this.preventClicks = false;
        });

        this.listenTo(this.views.rootView, "touch_move", function(e) {
            updateTouchedMarker(e);

            lastTouch = e;
            this.preventClicks = true;
        });

        this.listenTo(this.views.rootView, "touch_end", function() {
            if (extendedMarker) {
                this.options.api.command("show_marker_content", extendedMarker.get("id"));
            } else if (!checkPosOnMarker(lastTouch)) {
                this.options.api.command("toggle_play");
            }

            updateTouchedMarker(null);
            this.preventClicks = false;
        });

        this.listenTo(this.views.rootView, "touch_cancel", function() {
            this.preventClicks = false;
            this.lastTouch = null;
        });
    },

    // setup connection to player state
    setupStateConnection: function() {

        // mark marker as selected if the overlay for this marker is opened
        this.listenTo(this.options.playerState, "change:open_marker", function(state, openedID) {
            this.viewCollection.each(function(marker) {
                var opened = marker.get("id") === openedID;
                marker.set({
                    opened: opened,
                });
            });
        });

        // mark the correct marker as the active one
        var lastCurrentMarker = null;
        this.listenTo(this.options.playerState, "change:current_marker", function(state, currentMarker) {

            // get the correct view model
            if (currentMarker) {
                currentMarker = this.viewCollection.get(currentMarker.get("id"));
            }

            if (lastCurrentMarker !== currentMarker) {
                if (lastCurrentMarker) {
                    lastCurrentMarker.set({
                        current: false
                    });
                }
                if (currentMarker) {
                    currentMarker.set({
                        current: true
                    });
                }
                lastCurrentMarker = currentMarker;
            }
        });

        // listen to collapsed state
        this.listenTo(this.options.playerState, "change:controls_collapsed", function(state, collapsed) {
            this.rootView.$el.toggleClass("vp_collapsed", collapsed);
            this.viewCollection.each(function(marker) {
                marker.set({
                    collapsed: collapsed,
                });
            });
        });

    },

    setupInfoArrow: function() {
        if (this.getOption('showInfoArrow')) {
            var markerAppearances = this.options.video.get('ui_click_hint_appearences');
            this.listenTo(this.options.playerState, "change:current_marker", function(state, markerData) {
                if (this.getOption('showInfoArrow')) {
                    if (markerData) {
                        var marker = this.viewCollection.get(markerData);
                        if (marker) {
                            this.views.infoArrowView.model.set('offset', marker.get('offset'));
                        }
                        this.views.infoArrowView.fadeIn();
                    } else {
                        this.views.infoArrowView.fadeOut();
                        // listener is called once with null on beginning of video
                        if (markerAppearances > 0) {
                            markerAppearances--;
                        } else {
                            this.showInfoArrow = this.options.showInfoArrow = false;
                        }
                    }
                }
            });

            this.listenToOnce(this.options.playerState, "change:open_marker", function() {
                this.showInfoArrow = this.options.showInfoArrow = false;
                this.views.infoArrowView.fadeOut();
            });
        }
    },


    // ===== Api for external use =====

    // check marker click by client position
    checkMarkerClick: function(clickPosition) {
        if (document.elementFromPoint) {
            // overlay background was clicked at given position.
            // check if the click hit a marker and activate it.
            var $el = $(document.elementFromPoint(clickPosition.x, clickPosition.y)),
                $marker = $el.closest('.vp_marker_wrapper'),
                previousOpenID = this.options.playerState.get('last_opened_marker');

            if ($marker.length) {
                var id = $marker.data('markerId');

                if (id != previousOpenID) {
                    $marker.click();
                }
            }
        }
    }

});