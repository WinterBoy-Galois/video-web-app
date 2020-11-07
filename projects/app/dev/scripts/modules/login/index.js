var BaseModule = require('../module'),

    // components
    LoginComponent = require('./components/login.jsx'),
    SignupComponent = require('./components/signup.jsx'),
    ForgotPasswordComponent = require('./components/forgot_password.jsx'),
    MaintenanceComponent = require('./components/maintenance');


module.exports = BaseModule.extend({
    
    appRoutes: {
        "login": "showLoginView",
        "signup": "showSignupView",
        "signup_embed": "showSignupViewEmbed",
        "signup/?:params": "showSignupView",
        "forgot_pw": "showForgotPWView",
        "maintenance": "showMaintenanceView"
    },

    showLoginView: function() {
        this.setComponent(LoginComponent);

    },

    showSignupView: function() {
        this.setComponent(SignupComponent);
    },

    showSignupViewEmbed: function() {
        this.setComponent(SignupComponent, {
            embedded:true
        });
    },

    showForgotPWView: function() {
        this.setComponent(ForgotPasswordComponent);
    },

    showMaintenanceView: function(){
        this.setComponent(MaintenanceComponent);
    }

});