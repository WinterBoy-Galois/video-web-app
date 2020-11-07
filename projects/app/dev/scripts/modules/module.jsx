var _= require('underscore'),
    $ = require('jquery'),
    Marionette = require('marionette'),
    React = require('react'),
    ReactDom= require('react-dom'),
    Wrapper = require('components/controllerWrapper');



module.exports = Marionette.Module.extend({

    // app routes go here
    appRoutes: {},

    initialize: function() {
        // setup router
        this.setupRouter(this.app);
    },

    // compose the router for this app
    setupRouter: function() {

        var controller = this, 
            count = 0;

        var routes = _.mapObject(this.appRoutes, function(action){
            count++;
            if (_.isFunction(action)) {
                var funcName = 'show' + count;
                controller[funcName] = action.bind(controller);
                return funcName;
            }            
            return action;
        });

        var Router = Marionette.AppRouter.extend({
            appRoutes: routes,
            controller: controller,
        });
        this.router = new Router();
    },

    // set current controller
    setController: function(controller) {
        this.app.component.setState({
            content: <Wrapper controller={controller} />
        });
    },

    setComponent: function(Component, props) {
        this.app.component.setState({
            content: <Component {...props} />
        });
    },

});