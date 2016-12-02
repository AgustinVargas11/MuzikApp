'use strict';

var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var User = require('../../models/userModel');
var config = require('../../config');

module.exports = function () {
    passport.use(new FacebookStrategy({
        clientID: config.strategies.facebook.clientID,
        clientSecret: config.strategies.facebook.clientSecret,
        callbackURL: config.strategies.facebook.callbackURL,
        profileFields: ['email', 'displayName']
    }, function (accessToken, refreshToken, profile, done) {
        User.findOrCreate(profile, done);
    }))
};