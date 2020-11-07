var _ = require('underscore'),
    Marionette = require('marionette'),
    Mustache = require('mustache'),
    tinycolor = require('tinycolor'),
    desktopTemplate = require('!raw!./views/desktop.css');

require('!raw!./views/mobile.css');


module.exports = Marionette.Controller.extend({

    initialize: function(config) {
        this.config = config;

        this.mobile = this.config.playerState.get('platform') == this.config.playerState.platforms.MOBILE;

        // listen to color changes on player state
        this.listenTo(config.video, "change:ui_color_1 change:ui_color_2", function() {
            this.updateThemeFromData();
        });

        // changes on the video object should trigger updates
        this.listenTo(config.video, "change", function() {
            this.updateThemeFromData();
        });

        this.updateThemeFromData();

    },

    // call this to update the stylesheet for the system
    updateThemeFromData: function() {

        var video = this.config.video;

        // calculate the base colors, colors on the video
        var color1 = video.get("ui_color_1");
        var color2 = video.get("ui_color_2");
        var infoTextColor = video.get("ui_click_hint_color");
        var values = this.calculateColorsFromBaseColors(color1, color2, infoTextColor);

        // merge values from video object
        // will override things like custom fonts
        // and custom detail colors
        _.each(video.attributes, function(value, key) {
            if (key.indexOf("ui_") === 0 && value) {
                values[key] = value;
            }
        });

        // update stylesheet from values
        this.updateStyle(values);

    },

    /*
     * calculate colors derived from two base colors
     */
    calculateColorsFromBaseColors: function(color1, color2, clickHintColor) {

        // available text colors
        var textColors = [
            "#222222",
            "#444444",
            "#666666",
            "#888888",
            "#aaaaaa",
            "#cccccc",
            "#ffffff",
        ];


        // all needed colors
        var text1,
            text2,
            color1_2,
            color1_3,
            color1_4,
            color2_2;


        // determine text and icon colors which are most readable compared to their background
        text1 = tinycolor.mostReadable(color1, textColors).toHexString();
        text2 = tinycolor.mostReadable(color2, textColors).toHexString();

        // determine color1 colors
        var value1 = tinycolor(color1).toHsv().v;

        // depending on the value of color1,
        // have different secondary colors of color1
        if (value1 < 0.2) {
            color1_2 = tinycolor(color1).lighten(10).toHexString();
            color1_3 = tinycolor(color1).lighten(20).toHexString();
            color1_4 = tinycolor(color1).lighten(30).toHexString();
        } else if (value1 > 0.8) {
            color1_2 = tinycolor(color1).darken(10).toHexString();
            color1_3 = tinycolor(color1).darken(20).toHexString();
            color1_4 = tinycolor(color1).darken(30).toHexString();
        } else {
            color1_2 = tinycolor(color1).darken(10).toHexString();
            color1_3 = tinycolor(color1).lighten(10).toHexString();
            color1_4 = tinycolor(color1).lighten(20).toHexString();
        }


        // determine color2 colors
        var value2 = tinycolor(color2).toHsv().v;

        // depending on the value of color2, we can decide wether to lighten or darken the highlight color
        if (value2 > 0.5) {
            color2_2 = tinycolor(color2).darken(20).toHexString();
        } else {
            color2_2 = tinycolor(color2).lighten(20).toHexString();
        }

        if (false) {
            return {

                // playbar
                ui_color_playbar_outline: color1,
                ui_color_playbar_progress: color1_4,
                ui_color_playbar_buffer: color1_3,
                ui_color_playbar_buffer_border: color1,
                ui_color_playbar_background: color1_2,
                ui_color_playbar_indicators: color2,
                ui_color_playbar_indicators_background: color1,

                //markers
                ui_color_marker_background: color2,
                ui_color_marker_text: text2,
                ui_color_marker_outline: color2_2,

                // interface
                ui_color_button_background: color1,
                ui_color_button_highlight_background: color1_3,
                ui_color_button_text: text1,
                ui_color_button_highlight_text: text1,

            };

        } else {
            return {

                // playbar
                ui_color_playbar_outline: color1,
                ui_color_playbar_progress: color1_4,
                ui_color_playbar_buffer: color1_3,
                ui_color_playbar_background: color1_2,
                ui_color_playbar_indicators: text1,

                //markers
                ui_color_marker_background: color1,
                ui_color_marker_text: text1,
                ui_color_marker_outline: color1_2,

                ui_color_marker_highlight_background: color2,
                ui_color_marker_highlight_text: text2,
                ui_color_marker_highlight_outline: color2_2,

                // interface
                ui_color_button_background: color1,
                ui_color_button_highlight_background: color1_3,
                ui_color_button_text: text1,
                ui_color_button_highlight_text: text1,

                // overlays,
                ui_color_overlay_outline: color1,

                ui_click_hint_color: clickHintColor
            };
        }
    },


    // render style settings into css template
    updateStyle: function(values) {
        var style;

        style = Mustache.to_html(desktopTemplate, values);
        this.setStyle(style);
    },

    // attach new style sheet to dom
    setStyle: function(css) {

        var head = document.head || document.getElementsByTagName('head')[0],
            style = document.createElement('style');

        if (this.currentStyle) {
            head.removeChild(this.currentStyle);
        }

        style.type = 'text/css';
        if (style.styleSheet) {
            style.styleSheet.cssText = css;
        } else {
            style.appendChild(document.createTextNode(css));
        }
        head.appendChild(style);
        this.currentStyle = style;
    }


});