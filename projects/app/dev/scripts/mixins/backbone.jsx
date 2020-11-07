/*
 * Hook up backbone models and collections to react
 */

var _ = require('underscore'),
	Backbone = require('backbone'),
	React = require('react');


/*
 * Get access to browser / app environment
 */
module.exports = {

	/*
	 * Get all backbone models and collections
  	 */
	_getBackboneModels: function() {
		var props = this.props;
		return _.chain(this.backboneProps).map(function(modelName){
			return props[modelName];
		}).without(false).value();
	},

	/*
	 * create listeners for backbone events
	 * use instance of backbone events so we can 
	 * cleanly remove all listeners on unmount
	 */
	componentWillMount: function(){
		// create listener for events
		// use instance of backbone events so we can cleanly remove
		// all listeners on unmount
		var evs = _.extend({}, Backbone.Events),
			forceUpdate = this.forceUpdate.bind(this, null);
		this._backboneEvents = evs;
		_.each(this._getBackboneModels(), function(model){
			evs.listenTo(model, 'all', forceUpdate);
		});
	},

	/*
	 * Remove all listeners
	 */
	componentWillUnmount: function(){
		this._backboneEvents.stopListening();
		delete this._backboneEvents;
	},


	/*
	 * Convenience Prop Types
	 */
	PropTypes: {
		Model: React.PropTypes.instanceOf(Backbone.Model),
		Collection: React.PropTypes.instanceOf(Backbone.Collection)
	},

};
