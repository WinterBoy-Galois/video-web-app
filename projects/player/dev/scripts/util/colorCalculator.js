/*
 * Calculate ui colors
 */

var tinycolor = require('tinycolor');

var TEXT_COLORS = [
    "#222222",
    "#444444",
    "#666666",
    "#888888",
    "#aaaaaa",
    "#cccccc",
    "#ffffff",
];

function calculateColors(color1, color2, revision) {

        if (!revision) revision = {};


        // all needed colors
        var text1,
            text2,
            color1_2,
            color1_3,
            color1_4,
            color2_2;


        // determine text and icon colors which are most readable compared to their background
        text1 = tinycolor.mostReadable(color1, TEXT_COLORS).toHexString();
        text2 = tinycolor.mostReadable(color2, TEXT_COLORS).toHexString();

        // determine color1 colors
        var value1 = tinycolor(color1).toHsv().v;

        // depending on the value of color1,
        // have different secondary colors of color1
        if (value1 < 0.2) {
            color1_2 = tinycolor(color1).lighten(10).toHexString();
            color1_3 = tinycolor(color1).lighten(20).toHexString();
            color1_4 = tinycolor(color1).lighten(30).toHexString();
            color1_5 = tinycolor(color1).lighten(50).toHexString();
        } else if (value1 > 0.8) {
            color1_2 = tinycolor(color1).darken(10).toHexString();
            color1_3 = tinycolor(color1).darken(20).toHexString();
            color1_4 = tinycolor(color1).darken(30).toHexString();
            color1_5 = tinycolor(color1).darken(50).toHexString();
        } else {
            color1_2 = tinycolor(color1).darken(10).toHexString();
            color1_3 = tinycolor(color1).lighten(10).toHexString();
            color1_4 = tinycolor(color1).lighten(20).toHexString();
            color1_5 = tinycolor(color1).darken(20).toHexString();
        }


        // determine color2 colors
        var value2 = tinycolor(color2).toHsv().v;

        // depending on the value of color2, we can decide wether to lighten or darken the highlight color
        if (value2 > 0.5) {
            color2_2 = tinycolor(color2).darken(20).toHexString();
        } else {
            color2_2 = tinycolor(color2).lighten(20).toHexString();
        }

        /*
         * Return object with relevant color codes
         */
        return {

        	playbar: {
        		outlineColor: revision.ui_color_playbar_outline || color1,
        		progressColor:  revision.ui_color_playbar_progress || color1_4,
        		bufferColor: revision.ui_color_playbar_buffer || color1_3,
        		backgroundColor: revision.ui_color_playbar_background || color1_2,
        		indicatorColor: revision.ui_color_playbar_indicators || text1
        	},

        	marker: {
        		backgroundColor: revision.ui_color_marker_background || color1,
        		textColor: revision.ui_color_marker_text || text1,
        		outlineColor: revision.ui_color_marker_highlight_outline || color1_2,

        		activeBackgroundColor: revision.ui_color_marker_highlight_background || color2,
        		activeTextColor: revision.ui_color_marker_highlight_text || text2,
        		activeOutlineColor: revision.ui_color_playbar_outline || color2_2,

                font: revision.ui_font_marker,
                clickHintColor: revision.ui_click_hint_color,

                equalLengths: revision.ui_equal_marker_lengths
        	},

        	button: {
        		backgroundColor: revision.ui_color_button_background || color1,
        		textColor: revision.ui_color_button_text || text1,

        		activeBackgroundColor: revision.ui_color_button_highlight_background || color1_3,
        		activeTextColor: revision.ui_color_button_highlight_text || text1,
        	},

        	overlay: {
        		outlineColor: revision.ui_color_overlay_outline || color1,

                titleFont: revision.ui_font_overlay_titles,
                textFont: revision.ui_font_overlay_text,
        	},

            loadingIndicator: {
                backgroundColor:color1,
                outlineColor:color1_4,
                contrastColor: color1_5
            },

            icon: {
                url: revision.ui_icon || false
            }

        };
}

module.exports = calculateColors;