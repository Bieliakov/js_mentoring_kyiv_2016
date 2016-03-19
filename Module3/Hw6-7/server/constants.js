const appRoot = require('app-root-path').resolve('/');

module.exports = {
    STATUS: {
        OK: 200,
        CREATED: 201,
        NOT_FOUND: 404
    },
	path: {
		toHelpers: appRoot + 'server/helpers/',
        toTemplates: appRoot + 'server/templates/',
        toModels: appRoot + 'server/models/',
        toSharedRoutes: appRoot + 'server/routes/api/shared',
        toUploadedImages: appRoot + 'public/images/'
	},
    HTTP_HEADER_VALUE : {
        CONTENT_TYPE: {
            CHARSET_UTF8: 'charset=utf-8;',
            JSON: 'application/json;',
            HTML: 'text/html;'
        }
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
};    
