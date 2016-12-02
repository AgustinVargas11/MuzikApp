'use strict';

var express = require('express');
var router = express.Router();
var User = require('../models/userModel');
var http = require('request');
var genres = require('../data/genres');


router.route('/userprofile')
    .get(function (req, res) {
        User.findById(req.user._id, 'sameGenreSuggestions displayName', function (err, user) {
            if (err) return res.status(500).send(err);
            res.send(user);
        });
    })
    .put(function (req, res) {
        User.findByIdAndUpdate(req.user._id, req.body, {new: true}, function (err, updatedUser) {
            if (err) return res.status(500).send(err);

            res.send(updatedUser);
        })
    });

// recent searches
router.route('/recentsearch')
    .get(function (req, res) {
        User.findById(req.user._id, function (err, user) {
            if (err) return res.status(500).send(err);
            res.send(user.recentSearches);
        });
    })
    .post(function (req, res) {
        User.findById(req.user._id, function (err, user) {
            if (err) return res.status(500).send(err);

            var index;

            for (var i = 0, n = recentSearches.length; i < n; i++) {
                if (recentSearches[i].name === req.body.name) {
                    index = i;
                    break;
                }
            }

            if (!index || index === 0) {
                user.recentSearches.unshift(req.body);
                user.searchHistory.push(req.body);

                if (user.searchHistory.length > 50)
                    user.searchHistory = user.searchHistory.slice(0, 49); // keep search history slim

                if (user.recentSearches.length > 10)
                    user.recentSearches = user.recentSearches.slice(0, 9); // keep recent searches slim

                user.save(function (err) {
                    if (err) return res.send(err);
                    res.send({success: true});
                })
            } else {
                var name = user.recentSearches.splice(index, 1);
                user.recentSearches.unshift(name);
                user.save();
                res.send({success: false, msg: req.body.name + ' already in recent'});
            }
        });
    })
    .delete(function (req, res) {
        User.findById(req.user._id, function (err, user) {
            if (err) return res.status(500).send(err);
            user.recentSearches.length = 0;
            user.save(function (err) {
                if (err) return res.send(err);
                res.send({success: true, deleted: true});
            })
        });
    });

// artist suggestions
router.route('/suggestions')
    .get(function (req, res) {
        User.findById(req.user._id, 'searchHistory sameGenreSuggestions', function (err, searches) {
            if (err) return res.status(500).send(err);

            var randomSuggestions = [];
            var suggestions = null;
            var mostCommonGenre;
            var genreId = '';
            var newObj = {};
            var genre = '';
            var max = 0;
            var song;

            if (searches.sameGenreSuggestions) {
                if (!searches.searchHistory.length)
                    return;

                if (searches.searchHistory.length === 1) {
                    mostCommonGenre = searches.searchHistory[0].genre;
                } else {
                    searches.searchHistory.forEach(function (search) {
                        genre = search.genre;
                        if (genre) {
                            if (!newObj.hasOwnProperty(genre))
                                newObj[genre] = 1;
                            else
                                newObj[genre]++
                        }
                    });

                    for (var num in newObj) {
                        if (newObj[num] > max) {
                            max = newObj[num];
                            mostCommonGenre = num;
                        }
                    }
                }

                for (var genreName in genres) {
                    if (mostCommonGenre === genreName) {
                        genreId = genres[genreName];
                        break;
                    }
                }
            } else {
                var genreIdArr = [];

                for (var id in genres) {
                    genreIdArr.push(genres[id]);
                }

                genreId = genreIdArr[Math.floor(Math.random() * genreIdArr.length)]
            }

            http.get('https://itunes.apple.com/us/rss/topsongs/genre=' + genreId + '/json', function (err, response, data) {
                if (!err && response.statusCode === 200) {
                    suggestions = (JSON.parse(data));

                    suggestions = suggestions.feed.entry;

                    var returnObj = {};
                    suggestions = suggestions.map(function (a) {
                        returnObj = {};
                        returnObj.artistName = a['im:artist'].label;
                        returnObj.artworkUrl100 = a['im:image'][0].label;
                        returnObj.trackName = a['im:name'].label;
                        returnObj.previewUrl = a.link[1].attributes.href;
                        return returnObj;
                    });

                    for (var i = 0, num; i < 4; i++) {
                        num = Math.floor(Math.random() * suggestions.length);
                        song = suggestions[num];
                        randomSuggestions.push(song);
                        suggestions.splice(num, 1);
                    }
                    res.send(randomSuggestions);
                }
            })
        })
    });

module.exports = router;
