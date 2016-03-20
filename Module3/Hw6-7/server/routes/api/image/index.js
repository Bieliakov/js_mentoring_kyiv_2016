const appRoot = require('app-root-path').resolve('/');
const constants = require(appRoot + 'server/constants');
const fs = require('fs');

const express = require('express');
const router = express.Router();

router.get('', (req, res) => {
	if (!req.query.name) {
		return res.send(constants.message.error.queryName);
	}

	var requestedFileNameWithExtension = req.query.name;

	var fileNames = fs.readdirSync(constants.path.toUploadedImages);

	if (!fileNames.length) {
		return res.send(constants.message.error.noFilesInDir);
	}

	var fileNameWithExtension = '';

	fileNames.forEach(function(currentFileNameWithExtension) {
		if (requestedFileNameWithExtension === currentFileNameWithExtension){
			fileNameWithExtension = currentFileNameWithExtension;
		}
	});

	if (!fileNameWithExtension) {
		return res.status(constants.STATUS.NOT_FOUND).json({ error: constants.message.error.noFile});
	}

	var requestedFile = fs.readFileSync(constants.path.toUploadedImages + fileNameWithExtension);
	res.send(requestedFile);
});

module.exports = router;