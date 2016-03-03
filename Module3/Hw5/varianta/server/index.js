var http = require('http');
var url = require('url');
var util = require('util');
var path = require('path');

// var formidable = require('formidable');
var fs = require('fs');


var appRoot = require('app-root-path').resolve('/');
var neededFolderPath = 'public/images/';

var port = 3000;

http.createServer(function(req, res) {

    // second argument for transforming query to an object
    var parsedUrl =  url.parse(req.url, true);
    console.log('req.url.query', req.url.query)
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
        if (req.method == 'GET') {

            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8;' });

            writeResponseAndEnd(formTemplate);
        }



        if ( req.method == 'POST' ) {
            writeResponseAndEnd('post');
        }
        
    } else if (pathname.search(/\/image/) != '-1' ) {

        if ( req.method == 'POST' ) {
            
            // var form = new formidable.IncomingForm();
            // form.encoding = 'utf-8';
            // // form.uploadDir = "";
            // form.parse(req, function(err, fields, files) {
            //   res.writeHead(200, {'content-type': 'text/plain;charset=utf-8;'});
            //   res.write('received upload:\n\n');
            //   res.end(util.inspect({fields: fields, files: files}));
            // });

            // form.on('end', function(fields, files) {
            //     /* Temporary location of our uploaded file */
            //     var temp_path = this.openedFiles[0].path;
            //     /* The file name of the uploaded file */
            //     var file_name = this.openedFiles[0].name;

            //     /* Location where we want to copy the uploaded file */
            //     var new_location = appRoot + neededFolderPath;

            //     console.log('temp_path',temp_path);
            //     console.log('file_name', file_name);
            //     console.log('new_location',new_location)
         
            //     fs.copy(temp_path, new_location + file_name, function(err) {  
            //         if (err) {
            //             console.error(err);
            //         } else {
            //             console.log("success!")
            //         }
            //     });
            // });
            // writeResponseAndEnd('post');
        }


        
    }

    function writeResponseAndEnd(result){
        res.write(result);
        res.end();
    };

}).listen(port);

console.log('node server running on port ' + port);
