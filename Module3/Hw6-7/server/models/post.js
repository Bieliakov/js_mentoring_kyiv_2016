const mongoose = require('mongoose');
const appRoot = require('app-root-path').resolve('/');
const constants = require(appRoot + 'server/constants');

var PostSchema = mongoose.Schema({
    title: { type: String, trim: true },
    body: String,
    author: { type: String, ref: 'User' },
    author_avatar: {type: String, default: constants.VALUES.DEFAULT_IMAGE },
    comments: {type: Array, default: []},
    created: {type: Date, default: Date.now},
    commentCount: {type: Number, default: 0}
}, {collection: 'posts'});

module.exports = mongoose.model('Post', PostSchema);
