const invalidData = require('./invalidData.js');
const someUncorrectData = require('./someUncorrectData.js');
const appRoot = require('app-root-path').resolve('/');
const constants = require(appRoot + 'server/constants.js');
const fs = require('fs');

module.exports = {
	invalidData: invalidData,
	someUncorrectData: someUncorrectData,
	getContentTypeHeaderForFileByExtension: getContentTypeHeaderForFileByExtension,
	isAuthenticated: isAuthenticated
};

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

function isAuthenticated( req, res) {
    if (!req.user) {
        return res.send({message: 'No, no, no. Authorize yourself first, hacker!'});
    }
}
