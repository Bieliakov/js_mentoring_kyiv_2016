var mongoose = require('mongoose');
//var createdDate = require('../plugins/createdDate');
// var validEmail = require('../helpers/validate/email.js');
var crypto = require('crypto');

var UserSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true
	},
	githubId: String,
	salt: String,
	hashedPassword: String
}, {collection: 'users'});


// var UserSchema = new mongoose.Schema({

//     // _id: { type: String/*, lowercase: true, trim: true, validate: validEmail*/ },
//     username: { type: String, required: true },
//     password: { type: String, required: true },

//     // salt: { type: String, required: true },
//     // hash: { type: String, required: true },
//     created: { type: Date, default: Date.now }
// });

// add created date property
//schema.plugin(createdDate);

// properties that do not get saved to the db
//schema.virtual('fullname').get(function () {
//    return this.name.first + ' ' + this.name.last;
//});

UserSchema
	.virtual('password')
	.set(function(password) {
		this._password = password;
		this.salt = this.makeSalt();
		this.hashedPassword = this.encryptPassword(password);
	})
	.get(function() {
		return this._password;
	});

UserSchema.methods = {

  authenticate: function(plainText) {
  	// return plainText === this.password;
    return this.encryptPassword(plainText) === this.hashedPassword;
  },

  makeSalt: function() {
    return crypto.randomBytes(16).toString('base64');
  },

  encryptPassword: function(password) {
    if (!password || !this.salt) return '';
    var salt = new Buffer(this.salt, 'base64');
    return crypto.pbkdf2Sync(password, salt, 10000, 64).toString('base64');
  }

};

module.exports = mongoose.model('User', UserSchema);