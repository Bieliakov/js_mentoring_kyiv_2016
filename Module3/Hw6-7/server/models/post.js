var mongoose = require('mongoose');

var PostSchema = mongoose.Schema({
    title: { type: String, trim: true },
    body: String,
    author: { type: String, ref: 'User' },
    comments: {type: Array, default: []},
    created: {type: Date, default: Date.now()},
    commentCount: {type: Number, default: 0}
}, {collection: 'posts'})

module.exports = mongoose.model('Post', PostSchema);;
