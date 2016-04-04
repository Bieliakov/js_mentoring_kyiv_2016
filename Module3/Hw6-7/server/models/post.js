const mongoose = require('mongoose');
const appRoot = require('app-root-path').resolve('/');
const constants = require(appRoot + 'server/constants');
const Schema = mongoose.Schema;

const CommentSchema = Schema({
    _id: { type: Schema.Types.ObjectId, required: true },
    author: {type: String, required: true},
    text: { type: String, required: true },
    post: {type: Schema.Types.ObjectId, required: true, ref: 'Post'},
    author_avatar: { type: String }
});

var PostSchema = Schema({
    title: { type: String, trim: true },
    body: String,
    author: { type: String, ref: 'User' },
    author_avatar: {type: String, default: constants.VALUES.DEFAULT_IMAGE },
    comments: [CommentSchema],
    created: {type: Date, default: Date.now},
    commentCount: {type: Number, default: 0}
}, {collection: 'posts'});

module.exports = mongoose.model('Post', PostSchema);
