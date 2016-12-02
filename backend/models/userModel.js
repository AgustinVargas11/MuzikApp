// 'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    displayName: String,
    favoriteSnippets: [{
        type: Schema.Types.Mixed,
        ref: 'Snippet'
    }],
    searchHistory: [{
        name: String,
        genre: String
    }],
    sameGenreSuggestions: {
        type: Boolean,
        default: true
    },
    recentSearches: [{
        name: String,
        genre: String
    }],
    image: String,
    email: String,
    google: Object,
    twitter: Object,
    facebook: Object
});

UserSchema.statics.findOrCreate = function (profile, callback) {
    var provider = profile.provider;
    var query = provider === 'google' ? {'google.id': profile.id} :
        provider === 'twitter' ? {'twitter.id': profile.id} : {'facebook.id': profile.id};

    var email = profile.email || profile._json.email;
    var User = mongoose.model('User', UserSchema);

    this.findOne({$or: [query, {email: email}]}, function (err, user) {
        if (err) return callback(err);

        if (!user) {
            var user = new User;
            user[provider] = {};
            user[provider].id = profile.id;
            user.displayName = profile.displayName || profile.name;
            user.email = profile.email || profile._json.email;
            user.save(callback(null, user));
        } else if (!user[provider]) {
            user[provider] = {};
            user[provider].id = profile.id;
            user.save(callback(null, user));
        } else {
            callback(null, user);
        }
    });
};

module.exports = mongoose.model('User', UserSchema);