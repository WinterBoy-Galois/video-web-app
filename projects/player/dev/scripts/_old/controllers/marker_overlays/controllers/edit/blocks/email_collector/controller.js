var _ = require('underscore'),
    Controller = require('shared/controllers/controller'),
    View = require('./view');


module.exports = Controller.extend({


    views: {
        "rootView": {
            events: {
                "configure_clicked": function(file) {
                    var availableEmailIntegrations = window.parent.videopath_app.currentTeam.integrations.filter(function(item){
                        return item.get('type') == 'email-collector';
                    });
                    this.trigger("changed");
                    window.parent.videopath_app.operations.addIntegrationOp({integration: availableEmailIntegrations[0]});
                },
                "change_provider": function(provider) {
                    this.options.content.set({
                        service: provider
                    });
                    this.selectService(provider);
                    this.trigger("changed");
                },
                "change_list": function(list) {
                    this.options.content.set({
                        service_id: list
                    });
                    this.trigger("changed");
                },
                "change_text": function(text) {
                    this.options.content.set({
                        text: text
                    });
                    this.trigger("changed");
                }

            }
        }
    },

    buildRootView: function() {
        return new View({
            model: this.options.content
        });
    },

    onRootViewShow: function() {

        var _this = this;

    	var model = this.rootView.model,
            integrations = window.parent.videopath_app.currentTeam.integrations;
    	model.set({
    		loading:true
    	});

        /*
         * 
         */
    	integrations.fetch().always(function(){

            var configuredEmailIntegrations = integrations.where({
                type: 'email-collector',
                configured: true
            });

            var availableEmailIntegrations = integrations.where({
                type: 'email-collector'
            });

            model.set({
                loading:false,
                no_service: configuredEmailIntegrations.length == 0,
                services: _.map(availableEmailIntegrations, function(item){
                    return {
                        title: item.get('title'),
                        key: item.get('id')
                    };
                }),
                lists: []
            });

            _this.selectService(model.get('service'));

    	});
    },

    selectService: function(service_id) {

        var model = this.rootView.model;

        var service = window.parent.videopath_app.currentTeam.integrations.findWhere({
            id: service_id
        });

        if (!service) {
            model.set({
                'lists': [],
            });
            return;
        }

        model.set({loading:true});

        service.lists.fetch().then(function(){

            var lists = service.lists.map(function(item){
                 return {
                    title: item.get('title'),
                    key: item.get('id')
                };
            });

            model.set({
                'lists': lists,
            });
        }).always(function(){
            model.set({
                loading: false
            });
        });
    },



});