var http = require('http');
var url = require('url');
var util = require('util');
var path = require('path');
var router = require('./router');
// var formidable = require('formidable');
var fs = require('fs');


var appRoot = require('app-root-path').resolve('/');
var neededFolderPath = 'public/images/';

var port = 3000;

http.createServer(function(req, res) {

    var parsedUrl =  url.parse(req.url, true);
    console.log('req.url.query', req.url.query)
    var pathname = parsedUrl.pathname;
    var queryObject = parsedUrl.query;
    console.log('pathname', pathname)
    console.log('queryObject', queryObject)

    router(req, res, pathname, queryObject);

    // second argument for transforming query to an object

    
}).listen(port);

console.log('node server running on port ' + port);
