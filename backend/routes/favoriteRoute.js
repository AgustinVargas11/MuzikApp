'use strict';

var express = require('express');
var router = express.Router();
var User = require('../models/userModel');
var Snippet = require('../models/snippetModel');


router.route('/music')
    .get(function (req, res) {
        Snippet.find({user: req.user._id, kind: 'song'}, function (err, snippets) {
            if (err) return res.status(500).send(err);

            if (req.query.ids) {
                var snippetIds = snippets.map(function (snippet) {
                    return snippet.trackId
                });
                return res.send(snippetIds);
            }
            res.send(snippets);
        })
    })
    .post(function (req, res) {
        User.findById(req.user._id, function (err, user) {
            if (err) return res.status(500).send(err);

            if (user.favoriteSnippets.indexOf(req.body.trackId) < 0) {
                var snippet = new Snippet(req.body);
                snippet.user = req.user;
                snippet.save();
                user.favoriteSnippets.push(snippet.trackId);
                user.save(function (err) {
                    if (err) return res.status(500).send(err);
                    res.send({success: true, msg: 'Snippet saved.'})
                });
            } else {
                res.send({success: false, msg: 'Already favorited'});
            }
        });
    });

router.route('/musicvideos')
    .get(function (req, res) {
        Snippet.find({user: req.user._id, type: 'music-video'}, function (err, snippets) {
            if (err) return res.status(500).send(err);
            res.send(snippets);
        })
    })
    .post(function (req, res) {
        User.findById(req.user._id, function (err, user) {
            if (err) return res.status(500).send(err);

            if (user.favoriteSnippets.indexOf(req.body.trackId) < 0) {
                var snippet = new Snippet(req.body);
                snippet.user = req.user;
                snippet.save();
                user.favoriteSnippets.push(snippet.trackId);
                user.save(function (err) {
                    if (err) return res.status(500).send(err);
                    res.send({success: true, msg: 'Snippet saved.'})
                });
            } else {
                res.send({success: false, msg: 'Already favorited'});
            }
        });
    });

router.route('/remove/:id')
    .delete(function (req, res) {
        var snippet = req.params.id;

        Snippet.findByIdAndRemove(snippet, function (err, removedSnippet) {
            if (err) res.status(500).send(err);

            User.findById(req.user._id, function (err, user) {
                if (err) res.status(500).send(err);

                user.favoriteSnippets.splice(user.favoriteSnippets.indexOf(removedSnippet.trackId, 1));
                user.save(function (err) {
                    if (err) return res.status(500).send(err);

                    res.send({success: true, msg: 'Snippet removed from favorites'});
                });
            });
        });
    });


module.exports = router;