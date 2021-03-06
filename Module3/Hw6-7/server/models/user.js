var mongoose = require('mongoose');
const appRoot = require('app-root-path').resolve('/');
const constants = require(appRoot + 'server/constants');

var crypto = require('crypto');

var UserSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true
	},
	githubId: String,
	salt: String,
	hashedPassword: String,
	avatar_url: {type: String, default: constants.VALUES.DEFAULT_IMAGE}
}, {collection: 'users'});

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
