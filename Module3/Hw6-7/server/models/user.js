var mongoose = require('mongoose');
//var createdDate = require('../plugins/createdDate');
var validEmail = require('../helpers/validate/email.js');

var schema = new mongoose.Schema({
    _id: { type: String/*, lowercase: true, trim: true, validate: validEmail*/ },
    salt: { type: String, required: true },
    hash: { type: String, required: true },
    created: { type: Date, default: Date.now }
});

// add created date property
//schema.plugin(createdDate);

// properties that do not get saved to the db
//schema.virtual('fullname').get(function () {
//    return this.name.first + ' ' + this.name.last;
//});

module.exports = mongoose.model('User', schema);