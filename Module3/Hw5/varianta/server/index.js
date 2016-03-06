var http = require('http');
var url = require('url');
var util = require('util');
var path = require('path');
var router = require('./router');
// var formidable = require('formidable');
var fs = require('fs');


var appRoot = require('app-root-path').resolve('/');
var config = require(appRoot + 'server/config.js');

var neededFolderPath = 'public/images/';

var server = http.createServer();

server.on('request', function(req, res) {

	req.on('error', function(err) {
		console.error(err);
		res.statusCode = 400;
		res.end();
	});
	req.on('error', function(err) {
		console.error(err);
	});


    // second argument for transforming query to an object
    var parsedUrl =  url.parse(req.url, true);
    var pathname = parsedUrl.pathname;
    var queryObject = parsedUrl.query;

    router(req, res, pathname, queryObject);

    // res.statusCode = 404;
    // res.end();
});

server.listen(config.port);

console.log('node server running on port ' + config.port);
