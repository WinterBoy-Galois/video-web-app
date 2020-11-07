var _ = require('underscore'),
    Marionette = require('marionette'),
    $ = require('jquery');

require('tooltipster');


var behavior = Marionette.Behavior.extend({

    defaults: {
        // A selector for input group buttons,
        // that trigger view Submit event with the input value
        "inputGroupSubmit": "",
    },

    onRender: function() {
        this.setupFormGroups();
        this.setupInputGroups();
        this.setupFormHelpers();
    },

    // a few methods to help with forms
    setupFormHelpers: function() {
        var view = this.view;
        this.view.formHelpers = {
            get: function(selector) {
                var form = view.$(selector),
                    result = {};
                form.find('input, select').each(function() {
                    var key = $(this).attr("name");
                    result[key] = $(this).val();
                });
                return result;
            },
            set: function(selector, dict) {
                var form = view.$(selector);
                _.each(dict, function(value, key) {
                    form.find(":input[name=" + key + "]").val(value);
                });
            },
            clear: function(selector) {
                var form = view.$(selector);
                form.find('input').each(function() {
                    $(this).val("");
                });
            }
        };
    },

    setupFormGroups: function() {
        var _this = this,
            $formGroups = this.view.$el.find('.vp_form_group');

        if ($formGroups.length) {
            $formGroups.each(function() {
                var $formGroup = $(this);

                _this.setupClearInvalid($formGroup);
            });
        }
    },

    setupClearInvalid: function($formGroup) {
        var $input = $formGroup.find('input');
        if ($input.length) {
            $input.on('keyup focus', function(e) {
                // Don't count Enter keys
                if (e.keyCode !== 13) {
                    $formGroup.removeClass('vp_invalid');
                }
            });
        }
    },

    setupInputGroups: function() {
        var _this = this,
            submitSelector = this.getOption('inputGroupSubmit');

        var $inputGroups = this.view.$el.find(".vp_input_group");
        if ($inputGroups.length) {

            $inputGroups.each(function() {
                var $inputGroup = $(this),
                    $tooltip = $inputGroup.find('.vp_tooltip_icon');

                _this.setupMaxindicator($inputGroup);
                _this.setupInputGroupFocus($inputGroup);
                if (submitSelector) {
                    _this.setupInputGroupSubmit($inputGroup, submitSelector);
                }
                if ($tooltip.length) {
                    _this.setupInputGroupTooltip($tooltip);
                }
            });
        }
    },

    setupMaxindicator: function($inputGroup) {

        function setIndicator(maxlength, $input, $indicator) {
            var length = $input.val().length,
                remaining = maxlength - length;
            $indicator.text(remaining);
            $indicator.toggleClass('vp_red', remaining === 0);
        }

        var $maxlenghtInput = $inputGroup.find('input[maxlength]');

        if ($maxlenghtInput.length) {
            $inputGroup.find('.vp_maxlength_indicator').remove();

            var $indicator = $('<span class="vp_maxlength_indicator">');
            var maxlength = parseInt($maxlenghtInput.attr('maxlength'));

            $maxlenghtInput.on('change keyup', function() {
                setIndicator(maxlength, $maxlenghtInput, $indicator);
            });

            $maxlenghtInput.after($indicator);
            setIndicator(maxlength, $maxlenghtInput, $indicator);
        }
    },

    setupInputGroupFocus: function($inputGroup) {
        var $input = $inputGroup.find('input');

        $input.on('focus', function() {
            $inputGroup.addClass('vp_focus');
        });

        $input.on('blur', function() {
            $inputGroup.removeClass('vp_focus');
        });
    },

    setupInputGroupSubmit: function($inputGroup, submitSelector) {
        var $submit = $inputGroup.find(submitSelector),
            $input = $inputGroup.find('input'),

            _this = this;

        if ($submit.length) {
            $submit.on('click', function(e) {
                e.preventDefault();
                _this.view.trigger('submit', $input.val());
            });

            // Submit on Enter
            $input.on('change', function() {
                _this.view.trigger('submit', $input.val());
            });
        }
    },

    setupInputGroupTooltip: function($tooltip) {
        $tooltip.tooltipster({
            position: "top",
            onlyOne: true,
            delay: 300,
            maxWidth: 350,
        });
    }

});

module.exports = behavior;