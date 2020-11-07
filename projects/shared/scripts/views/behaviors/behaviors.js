var Marionette = require('marionette'),
    PlayerResize = require('behaviors/player_resize'),
    Stickit = require('behaviors/stickit'),
    SelfTest = require('behaviors/selftest'),
    Fading = require('behaviors/fading'),
    Form = require('behaviors/form'),
    StringBindings = require('behaviors/string_bindings'),
    Tooltips = require('behaviors/tooltips'),
    LoadingIndicator = require('behaviors/loading_indicator'),
    DropdownMenu = require('behaviors/dropdown_menu'),
    HistoryButtons = require('behaviors/history_buttons'),
    FastClick = require('behaviors/fastclick'),
    ProgressBar = require('behaviors/progress_bar'),
    ShareButtons = require('behaviors/share_buttons');


Marionette.Behaviors.behaviorsLookup = function() {
    return {
        PlayerResize: PlayerResize,
        Stickit: Stickit,
        SelfTest: SelfTest,
        Fading: Fading,
        StringBindings: StringBindings,
        Form: Form,
        Tooltips: Tooltips,
        LoadingIndicator: LoadingIndicator,
        DropdownMenu: DropdownMenu,
        HistoryButtons: HistoryButtons,
        // Hammer: Hammer,
        FastClick: FastClick,
        ProgressBar: ProgressBar,
        ShareButtons: ShareButtons
    };
};