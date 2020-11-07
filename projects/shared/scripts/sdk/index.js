var config = require('./config'),

    // collections
    users = require('./models/users'),
    Invoices = require('./models/invoices'),
    Plans = require('./models/plans'),
    Teams = require('./models/teams'),
    Videos = require('./models/videos'),
    Profiles = require('./models/profiles');

/*
 * API Main Interface
 */
module.exports = {

    /*
     * Config
     */
    setEndpoint: config.setEndpoint,
    setStripePublicKey: config.setStripePublicKey,

    /*
     *  Users
     */
    users: users,
    currentUser: users.getCurrentUser(),

    /*
     * Payment etc
     */
    invoices: new Invoices(),
    plans: new Plans(),

    videos: new Videos(),

    /*
     * Teams
     */
    teams: new Teams(),
    profiles: new Profiles()

};
