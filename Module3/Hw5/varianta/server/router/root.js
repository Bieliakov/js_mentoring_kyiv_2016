const appRoot = require('app-root-path').resolve('/');
const fs = require('fs');
const helpers = require(appRoot + 'server/helpers');
const constants = require(appRoot + 'server/constants');
const pathToTemplates = appRoot + 'server/templates/components/';


module.exports = function (req, res, pathName, queryObject) {
	if (req.method.toLowerCase() == 'get') {

		var lastUploadedFileName = helpers.getLastUploadedFileNameInDirectory(constants.path.toUploadedImages);

		if (!lastUploadedFileName) {
			return res.end(constants.message.error.noFilesInDir);
		}

		var lastUploadedFileNameExtension = lastUploadedFileName.slice(lastUploadedFileName.lastIndexOf('.') + 1);
		
		var contentTypeHeader = helpers.getContentTypeHeaderForFileByExtension(lastUploadedFileNameExtension);

		res.setHeader('Content-Type', contentTypeHeader);

		var lastUploadedFile = fs.readFileSync(constants.path.toUploadedImages + lastUploadedFileName);
		res.end(lastUploadedFile);
	}
}