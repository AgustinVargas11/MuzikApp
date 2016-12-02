'use strict';

var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth2');
var User = require('../../models/userModel');
var config = require('../../config');

module.exports = function () {
    passport.use(new GoogleStrategy({
            clientID: config.strategies.google.clientID,
            clientSecret: config.strategies.google.clientSecret,
            callbackURL: config.strategies.google.callbackURL,
        },
        function(req, accessToken, refreshToken, profile, done) {
            User.findOrCreate(profile, done);
        }));
};