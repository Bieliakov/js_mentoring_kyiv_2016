const appRoot = require('app-root-path').resolve('/');
const fs = require('fs');
const helpers = require(appRoot + 'server/helpers');
const constants = require(appRoot + 'server/constants');
module.exports = function(req, res) {
	if (req.method.toLowerCase() == 'get') {

		var headerTemplate = fs.readFileSync(constants.path.toTemplates + 'common/header.html');
		var footerTemplate = fs.readFileSync(constants.path.toTemplates + 'common/footer.html');

		var lastUploadedFileName = helpers.getLastUploadedFileNameInDirectory(constants.path.toUploadedImages);

		if (!lastUploadedFileName) {
			return res.end(constants.message.error.noFilesInDir);
		}

		res.writeHead(constants.STATUS.OK, {
			'content-type': constants.HTTPHeaderValue.contentType.html + constants.HTTPHeaderValue.contentType.charsetUTF8
		});

		res.write(headerTemplate);

		var imageTemplate = helpers.getImageTemplate(lastUploadedFileName);
		res.write(imageTemplate);
		res.write(footerTemplate);
		res.end();
	}
};
