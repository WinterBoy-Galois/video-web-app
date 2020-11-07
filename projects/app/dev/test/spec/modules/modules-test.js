var _ = require('underscore');

var modules = {
    'dashboard': require('modules/dashboard'),
    'login': require('modules/login'),
    'settings': require('modules/settings'),
    'videos': require('modules/videos'),
    'teams': require('modules/videos'),
};


_.forEach(modules, function(Module, key) {

    describe('Module: ' + key, function() {

        it("can be instantiated", function() {
            var m = new Module(null, key, {});
            expect(m).to.exist;
        });

    });

});
