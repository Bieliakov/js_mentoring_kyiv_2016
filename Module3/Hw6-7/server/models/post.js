var mongoose = require('mongoose');

var PostSchema = mongoose.Schema({
    title: { type: String, trim: true }
  , body: String
  , author: { type: String, ref: 'User' }
  
}, {collection: 'posts'})

module.exports = mongoose.model('Post', PostSchema);;
