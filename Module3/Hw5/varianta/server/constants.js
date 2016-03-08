const appRoot = require('app-root-path').resolve('/');

module.exports = {
	STATUS: {
		OK: 200,
		NOT_FOUND: 404
	},
	path: {
		toUploadedImages: appRoot + 'public/images/',
		toTemplates: appRoot + 'server/templates/',
	},
	HTTPHeaderValue : {
		contentType: {
			charsetUTF8: 'charset=utf-8;',
			json: 'application/json;',
			html: 'text/html;',
			gif: 'image/gif;',
			jpg: 'image/jpeg;',
			png: 'image/png'
		}
	},

	message: {
		error: {
			queryName: 'Please, provide correct query name such as "name"',
			noFile: 'Sorry, there is no file with requested name',
			noFilesInDir: 'There weren\'t any files uploaded yet!',
			inproperImage: 'Please provide a proper image',
			fileAlreadyExists: 'file with the same name is already exists',
			emptyFile: 'The file is empty. Plese, provide a proper one!'
		}
	}


}