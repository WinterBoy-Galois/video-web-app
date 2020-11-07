var $ = require('jquery'),
    _ = require('underscore'),
	   Backbone = require("backbone");


var loading = false;

var eventsProxy = _.extend({}, Backbone.Events);
$(document).ajaxStart(function() {
    loading = true;
    eventsProxy.trigger("ajax_start");
});
$(document).ajaxStop(function() {
    loading = false;
    eventsProxy.trigger("ajax_stop");
});

/*
 * Get access to browser / app environment
 */
module.exports = {

  componentWillMount: function(){
      this._updateAjaxState();
      // set up listeners
      var _this = this;
      eventsProxy.on('ajax_start ajax_stop', function(){
          _this._updateAjaxState();
      });
  },

  _updateAjaxState: function(){
      this.setState({
        ajax_loading:loading
      });
  },

  componentWillUnmount: function() {
  	 eventsProxy.off('ajax_start ajax_stop');
  }

};
