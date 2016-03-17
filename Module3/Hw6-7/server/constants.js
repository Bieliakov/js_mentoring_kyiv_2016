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
        toSharedRoutes: appRoot + 'server/routes/api/shared'
	},
    HTTP_HEADER_VALUE : {
        CONTENT_TYPE: {
            CHARSET_UTF8: 'charset=utf-8;',
            JSON: 'application/json;',
            HTML: 'text/html;'
        }
    }
};
