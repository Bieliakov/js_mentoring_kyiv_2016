var appRoot = require('app-root-path').resolve('/');
var constants = require(appRoot + 'server/constants.js');
var fs = require('fs');

module.exports = {
	getContentTypeHeaderForFileByExtension: getContentTypeHeaderForFileByExtension,
	getLastUploadedFileNameInDirectory: getLastUploadedFileNameInDirectory
}

function getContentTypeHeaderForFileByExtension(fileExtension){
	var lowerCasedFileExtension = fileExtension.toLowerCase();
	switch(lowerCasedFileExtension) {
	    case "gif": 
	    	return constants.HTTPHeaderValue.contentType.gif;
	    case "png": 
	    	return constants.HTTPHeaderValue.contentType.png;
	    case "jpeg":
	    case "jpg":
	    	return constants.HTTPHeaderValue.contentType.jpg;
    	default:
    		return false;
	}
}

function getLastUploadedFileNameInDirectory(pathToDirectory){
	var fileNames = fs.readdirSync(pathToDirectory);

	if (!fileNames.length) {
		return false;
	}

	var filesStats = fileNames.map(function(fileName) {
		return fs.statSync(pathToDirectory + fileName);
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

	var lastUploadedFileName = fileNames[index];
	return lastUploadedFileName;
}
