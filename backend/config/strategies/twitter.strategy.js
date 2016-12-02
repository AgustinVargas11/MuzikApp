'use strict';

var passport = require('passport');
var TwitterStrategy = require('passport-twitter-email').Strategy;
var User = require('../../models/userModel');
var config = require('../../config')

module.exports = function () {
    passport.use(new TwitterStrategy({
        consumerKey: config.strategies.twitter.consumerKey,
        consumerSecret: config.strategies.twitter.consumerSecret,
        callbackURL: config.strategies.twitter.callbackURL
    }, function (token, tokenSecret, profile, done) {
        User.findOrCreate(profile, done);
    }))
};