'use strict';

var express = require('express');
var router = express.Router();
var passport = require('passport');

router.route('/authenticate')
    .get(function (req, res) {
        res.send({isLoggedIn: req.isAuthenticated()});
    });

router.route('/logout')
    .get(function (req, res) {
        req.logout();
        res.redirect('/');
    });

router.route('/google')
    .get(passport.authenticate('google', {
        scope: ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email']
    }));

router.route('/google/callback')
    .get(passport.authenticate('google', {
        successRedirect: '/#/search'
    }));

router.route('/twitter')
    .get(passport.authenticate('twitter'));

router.route('/twitter/callback')
    .get(passport.authenticate('twitter', {
        successRedirect: '/#/search'
    }));

router.route('/facebook')
    .get(passport.authenticate('facebook'));

router.route('/facebook/callback')
    .get(passport.authenticate('facebook', {
        successRedirect: '/#/search'
    }));

module.exports = router;
