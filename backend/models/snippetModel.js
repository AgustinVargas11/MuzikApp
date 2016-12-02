'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SnippetSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    kind: {
        type: String,
        enum: ['song', 'music-video']
    },
    artistName: String,
    artworkUrl100: String,
    trackName: String,
    trackViewUrl: String,
    previewUrl: String,
    trackExplicitness: String,
    trackId: Number,
    favorite: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('Snippet', SnippetSchema);