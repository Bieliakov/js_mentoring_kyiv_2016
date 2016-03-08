const appRoot = require('app-root-path').resolve('/');
const fs = require('fs');
const helpers = require(appRoot + 'server/helpers');
const constants = require(appRoot + 'server/constants');

module.exports = function (req, res, pathName, queryObject) {
	if (req.method.toLowerCase() == 'get') {

		if (!queryObject.name) {
			return res.end(constants.message.error.queryName);
		}

		var requestedFileNameWithExtension = queryObject.name;

		var fileNames = fs.readdirSync(constants.path.toUploadedImages);

		if (!fileNames.length) {
			return res.end(constants.message.error.noFilesInDir);
		}

		var fileNameWithExtension = '';

		fileNames.forEach(function(currentFileNameWithExtension) {
			if (requestedFileNameWithExtension === currentFileNameWithExtension){
				fileNameWithExtension = currentFileNameWithExtension;
			};
		});

		if (!fileNameWithExtension) {
			res.statusCode = constants.STATUS.NOT_FOUND;
			return res.end(constants.message.error.noFile);
		}

		var requestedFile = fs.readFileSync(constants.path.toUploadedImages + fileNameWithExtension);
		res.end(requestedFile);
	}
}