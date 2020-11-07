var app = require('app');


/*
 * Get access to browser / app environment
 */
module.exports = {

  componentWillMount: function(){
      this.modals = app.modals;
  },

  /*
   * Get a query variable
   */	
  getQueryVariable: function(variable){
  	variable = variable.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp(variable + "=([^&]*)"),
        results = regex.exec(location.hash);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
  },

};
