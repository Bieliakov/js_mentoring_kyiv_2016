
const appRoot = require('app-root-path').resolve('/');
const fs = require('fs');
const helpers = require(appRoot + 'server/helpers');
const constants = require(appRoot + 'server/constants');

module.exports = function (req, res, pathName, queryObject) {
	if (req.method.toLowerCase() == 'get') {
		if (!Object.keys(queryObject).length) {
			getPathWithoutQuery(res, pathName);
		} else {
			getPathWithQuery(res, queryObject);
		}
	}
};

function getPathWithoutQuery(res) {
	var headerTemplate = fs.readFileSync(constants.path.toTemplates + 'common/header.html');
    var footerTemplate = fs.readFileSync(constants.path.toTemplates + 'common/footer.html');
    
	var fileNames = fs.readdirSync(constants.path.toUploadedImages);

	var imageListTemplate = helpers.getImageListTemplate(fileNames);

	res.writeHead(constants.STATUS.OK, {
        'content-type': constants.HTTPHeaderValue.contentType.html + constants.HTTPHeaderValue.contentType.charsetUTF8
    });
	res.write(headerTemplate);
	res.write(imageListTemplate);
	res.write(footerTemplate);
	res.end();
}

function getPathWithQuery(res, queryObject) {
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
		}
	});

	if (!fileNameWithExtension) {
		res.statusCode = constants.STATUS.NOT_FOUND;
		return res.end(constants.message.error.noFile);
	}

	var requestedFile = fs.readFileSync(constants.path.toUploadedImages + fileNameWithExtension);
	res.end(requestedFile);
}
