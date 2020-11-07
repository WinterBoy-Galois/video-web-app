var sdk = require('sdk'),
    BaseView = require('./toolbar_baseview'),
    template = require('./video_settings.html');


var view = BaseView.extend({
    // do stuff
    template: template,

    behaviors: {
        Tooltips: {}
    },

    ui: {
        title: ".title",
        description: ".description",
        tags: ".tags",
        custom_tracking_code: ".custom_tracking_code",
        equal_marker_lenghts: ".equal_marker_lenghts",
        continuous_playback: ".continuous_playback",
        disable_share_buttons: ".disable_share_buttons",
        video_password: ".video_password",
        fit_video: ".fit_video",
        settings: ".vp_settings"
    },

    events: {
        "change .equal_marker_lenghts": "save",
        "change .disable_share_buttons": "save",
        "change .fit_video": "save"
    },

    onDestroy: function() {
        this.save();
    },

    save: function() {
        this.revision.set({
            title: this.ui.title.val(),
            description: this.ui.description.val(),
            tags: this.ui.tags.val(),
            custom_tracking_code: this.ui.custom_tracking_code.val(),
            password: this.ui.video_password.val(),
            ui_equal_marker_lengths: this.ui.equal_marker_lenghts.is(":checked"),
            ui_disable_share_buttons: this.ui.disable_share_buttons.is(":checked"),
            ui_fit_video: this.ui.fit_video.is(":checked"),
            continuous_playback: this.ui.continuous_playback.is(":checked")
        });
        this.revision.save();
    },

    onRender: function() {
        this.ui.title.val(this.revision.get("title"));
        this.ui.description.val(this.revision.get("description"));
        this.ui.tags.val(this.revision.get("tags"));
        this.ui.custom_tracking_code.val(this.revision.get("custom_tracking_code"));
        this.ui.video_password.val(this.revision.get("password"));
        this.ui.equal_marker_lenghts.prop('checked', this.revision.get("ui_equal_marker_lengths"));
        this.ui.disable_share_buttons.prop('checked', this.revision.get("ui_disable_share_buttons"));
        this.ui.fit_video.prop('checked', this.revision.get("ui_fit_video"));
        this.ui.continuous_playback.prop('checked', this.revision.get("continuous_playback"));
        this.ui.custom_tracking_code.val(this.revision.get("custom_tracking_code"));

        // ga tracking only available to dev for now!
        if (!this.team.canUseFeature("custom_analytics")) {
            this.ui.custom_tracking_code.closest(".vp_form_group").remove();
        }

        // password  only available to dev for now!
        if (!this.team.canUseFeature("advanced_settings")) {
            this.ui.video_password.closest(".vp_form_group").remove();
        }

        // continous playback only available for dev now
        if (!this.team.canUseFeature("advanced_settings")) {
            this.ui.continuous_playback.closest(".vp_form_group").remove();
        }

        //
        if (!this.team.canUseFeature("advanced_settings")) {
            this.ui.disable_share_buttons.closest(".vp_form_group").remove();
        }

        if (!this.team.canUseFeature("advanced_settings")) {
            this.ui.equal_marker_lenghts.closest(".vp_form_group").remove();
        }

    },

});
module.exports = view;