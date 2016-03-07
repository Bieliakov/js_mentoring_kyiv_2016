const appRoot = require('app-root-path').resolve('/');
const fs = require('fs');
const helpers = require(appRoot + 'server/helpers');
const constants = require(appRoot + 'server/constants');
const pathToTemplates = appRoot + 'server/templates/components/';


module.exports = function (req, res, pathName, queryObject) {
	if (req.method.toLowerCase() == 'get') {
		var fileNames = fs.readdirSync(constants.path.toUploadedImages);
		var filesStats = fileNames.map(function(fileName) {
			return fs.statSync(constants.path.toUploadedImages + fileName);
		});

		var fileCreationDates = filesStats.map(function(fileStat){
			return fileStat.ctime.getTime();
		});

		var maximum = 0;
		var index = -1;
		fileCreationDates.forEach(function(timestamp, ind) {
			if (timestamp > maximum) {
				maximum = timestamp;
				index = ind;
			}
		});

		console.log('maximum', maximum);

		var lastUploadedFile = fs.createReadStream(constants.path.toUploadedImages + fileNames[index]);

		// lastUploadedFile.pipe(res);
		res.write(lastUploadedFile)
		res.end();

		console.log(Object.keys(lastUploadedFile));
		// console.log('filesStats', filesStats)	
		// res.end('filesStats', JSON.stringify(filesStats))
	}
}