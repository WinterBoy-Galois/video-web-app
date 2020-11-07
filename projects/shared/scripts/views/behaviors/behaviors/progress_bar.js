var $ = require('jquery'),
    Marionette = require('marionette');


module.exports = Marionette.Behavior.extend({

    $bars: null,
    model: null,
    progress: null,

    defaults: {
        modelField: "progress"
    },

    onRender: function() {
        this.$bar = this.view.$('.vp_progress');
        this.$bar.append($('<div class="vp_progress_bar">'));
        if (this.view.model) {
            this.setupModel();
        }
    },

    setupModel: function() {
        var _this = this;
        this.view.listenTo(this.view.model, 'change:' + this.getOption('modelField'), function(_, progress) {
            _this.progress = progress;
            _this.updateBar();
        });
    },

    updateBar: function() {
        var $wrapper = this.$bar,
            $bar = $wrapper.find('.vp_progress_bar'),
            progress = this.progress.current / this.progress.total,
            exceeded = progress > 1;

        if (exceeded) {
            $bar.css('width', '100%');
        } else {
            $bar.css('width', (progress * 100) + '%');
        }
        $wrapper.toggleClass('vp_progress_exceeded', exceeded);
    }
});