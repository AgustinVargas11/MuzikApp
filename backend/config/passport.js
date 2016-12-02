'use strict';

var passport = require('passport');

module.exports = function (app) {
    app.use(passport.initialize()); // initialize
    app.use(passport.session());

    passport.serializeUser(function (user, done) {
        done(null, user);
    });
    passport.deserializeUser(function (user, done) {
        done(null, user);
    });

    require('./strategies/google.strategy.js')();
    require('./strategies/twitter.strategy.js')();
    require('./strategies/facebook.strategy.js')();
};