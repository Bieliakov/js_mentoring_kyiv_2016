const appRoot = require('app-root-path').resolve('/');

module.exports = {
	STATUS: {
		OK: 200
	},
	path: {
		toUploadedImages: appRoot + 'public/images/'
	}
}