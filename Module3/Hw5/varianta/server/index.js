var http = require('http');
var url = require('url');

var fs = require('fs');

var port = 3000;

var form = 
"<!DOCTYPE HTML>" +
"<html>" +
    "<body>" +
        "<form method='post' action='/image' enctype='multipart/form-data'>" +
            "<input type='file' name='image'/>" +
            "<input type='submit' />" +
        "</form>" +
    "</body>" +
"</html>";


http.createServer(function(req, res) {

    // second argument for transforming query to an object
    var parsedUrl =  url.parse(req.url, true);
    var pathname = parsedUrl.pathname;
    var queryObject = parsedUrl.query;
    console.log('pathname', pathname)
    console.log('queryObject', queryObject)

    var output = '';

    if (pathname === '/' ) {
        if (req.method == 'GET'){
            writeResponseAndEnd('GET root');
        }

    } else if (pathname.search(/\/post\/?$/) != '-1'){

        if ( req.method == 'POST' ) {
            writeResponseAndEnd('post');
        }
        
    } else if (pathname.search(/\/image/) != '-1' ) {

        if ( req.method == 'POST' ) {
            console.log('req.files', req.files)
            // writeResponseAndEnd('post');
        }

        if (req.method == 'GET') {

            res.writeHead(200, {'Content-Type': 'text/html' });

            writeResponseAndEnd(form);
        }
        
    }

    function writeResponseAndEnd(result){
        res.write(result);
        res.end();
    };

}).listen(port);

console.log('node server running on port ' + port);
