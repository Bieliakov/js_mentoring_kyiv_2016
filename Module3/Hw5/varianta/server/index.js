var http = require('http');
var url = require('url');

var fs = require('fs');

var port = 3000;

http.createServer(function(request, response) {

    // second argument for transforming query to an object
    var parsedUrl =  url.parse(request.url, true);
    var pathname = parsedUrl.pathname;
    var queryObject = parsedUrl.query;
    console.log('pathname', pathname)
    console.log('queryObject', queryObject)

    var output = '';

    if (pathname === '/' ) {
        if (request.method == 'GET'){
            writeResponseAndEnd('GET root');
        }

        // output = JSON.stringify(Object.keys(countries.countries));
        // writeResponseAndEnd(output);
    } else if (pathname.search(/\/post\/?$/) != '-1'){

        if ( request.method == 'POST' ) {
            writeResponseAndEnd('post');
        }
        
    } else if (pathname.search(/\/secret/) != '-1' ) {
        if (request.method == 'GET') {
            writeResponseAndEnd('secret');
        }
        
    }

    function writeResponseAndEnd(result){
        response.write(result);
        response.end();
    };

}).listen(port);

console.log('node server running on port ' + port);
