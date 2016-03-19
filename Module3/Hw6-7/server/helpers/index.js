const invalidData = require('./invalidData.js');
const someUncorrectData = require('./someUncorrectData.js');
var appRoot = require('app-root-path').resolve('/');
var constants = require(appRoot + 'server/constants.js');
var fs = require('fs');

module.exports = {
	invalidData: invalidData,
	someUncorrectData: someUncorrectData,
	getContentTypeHeaderForFileByExtension: getContentTypeHeaderForFileByExtension,
	getLastUploadedFileNameInDirectory: getLastUploadedFileNameInDirectory,
	getImageListTemplate: getImageListTemplate,
	getImageTemplate: getImageTemplate
};

function getImageListTemplate(fileNames){
	if (!fileNames.length) {
		return constants.message.error.noFilesInDir;
	}

	var listHeaderTemplate = '<ul>';

	var listTemplate = '';

	fileNames.forEach(function(fileName) {
		var listItemTemplate = 
			'<li>' +
				'<a href="/image?name=' + fileName + '" />' + fileName + '</a><br>' +
				getImageTemplate(fileName) +
			'</li>'
		;
		listTemplate += listItemTemplate;
	});

	var listFooterTemplate = '</ul>';

	var fullImageListTemplate = listHeaderTemplate + listTemplate + listFooterTemplate;
	return fullImageListTemplate;
}

function getImageTemplate(fileName) {
	return '<img style="max-width: 600px;" src="/image?name=' + fileName + '" />';
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
