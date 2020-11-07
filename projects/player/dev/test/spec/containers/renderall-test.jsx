/*
 * Test components by accessing the demo video 
 */

var _ = require('underscore'),
    redux = require('redux'),
    React = require('react'),
    ReactTestUtils = require('react-addons-test-utils'),
    ReactRedux = require('react-redux'),


    config = require('../../../demo/components/containers/containers_page/config.jsx'),
    optionsEnv = require('../../../demo/components/config/environmentOptions'),
    optionsState = require('../../../demo/components/config/playerStateOptions');


// default state and env
var playerState = _.mapObject(optionsState, function(item){return item[0];}),
    environment =  _.mapObject(optionsEnv, function(item){return item[0];});

_.each(config, function(entry, key){


	describe('App Components: ' + key, function(){

        // react components
        var Component = entry.component,    
            ControllComponent = entry.controllComponent;
        

        // construct defaultprops
        var defaultProps = _.mapObject(entry.defaultProps, function(value, key){
            return entry.props[key][value];
        });
        defaultProps.environment= environment;
        defaultProps.playerState = playerState;


        // inject callbacks if available
        var callbacks = _.reduce(entry.callbacks, function(memo, item){
            memo[item] = function() {};
            return memo;
        }, {});
        defaultProps = _.extend(defaultProps, callbacks);


        // render helper
        function render(props) {

            var store =redux.createStore(function(){return {};}),
                element = false;
            if ( ControllComponent ) {
                element = <ControllComponent 
                        environment={environment}
                        playerState={playerState}
                        component={Component}
                        compProps={props}
                        />;
            } else {
                element = <Component {...props} />;
                
            }
            ReactTestUtils.renderIntoDocument(<ReactRedux.Provider store={store}>{element}</ReactRedux.Provider>);
        };


		it("exists", function() {
            expect(entry.component).to.exist;
        });

        it("can mount and unmount with defaults", function() {
            render(defaultProps);
        });


        // find all iteratable props and test those
        
        _.each(entry.props, function( prop, propName ){

            _.each(prop, function(value, key) {
                var props = defaultProps;
                props[key] = value;
                it('can mount and unmount with ' + propName + ' set to: ' + key, function(){
                    render(props);
                });
            });

        });
        

	});


});
