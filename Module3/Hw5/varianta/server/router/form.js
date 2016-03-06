const appRoot = require('app-root-path').resolve('/');
const fs = require('fs');
const helpers = require(appRoot + 'server/helpers');
const constants = require(appRoot + 'server/constants');
const pathToTemplates = appRoot + 'server/templates/components/';
// var multiparty = require('multiparty');
// var util = require('util');
const StringDecoder = require('string_decoder').StringDecoder;
const decoder = new StringDecoder('utf8');
// var headerTemplate = require(appRoot + 'server/templates/common/header.html');
// var mainTemplate = require(appRoot + 'server/templates/components/form/form.html');
// var footerTemplate = require(appRoot + 'server/templates/common/footer.html');

module.exports = function (req, res, pathName, queryObject) {

    // if (pathname.search(/\/post\/?$/) != '-1'){
    if (req.method.toLowerCase() == 'get') {
        var data = fs.readFileSync(pathToTemplates + 'form/form.html');
        // var result = headerTemplate + mainTemplate + footerTemplate;
        res.writeHead(constants.STATUS.OK, {'content-type': 'text/html;charset=utf-8;'});
        res.end(data);
    }



    if ( req.method.toLowerCase() == 'post' ) {
        console.log('req.headers', req.headers);

        // parse boundary from header Content-Type
        var contentTypeHeaderValue = req.headers['content-type'];
        var boundaryPosition = contentTypeHeaderValue.search('boundary=');
        var boundaryValue = contentTypeHeaderValue.slice(boundaryPosition + 9);
        console.log('boundaryValue', boundaryValue)


        var body = [];
        req.on('data', function(chunk) {
            console.log('chunk', chunk)
            body.push(chunk);
        });
        req.on('end', function() {
            var buffer = Buffer.concat(body);
            var bufferStringified = buffer.toString();

            // remove boundaries
            // remove top boundary
            var topBoundaryStart = bufferStringified.indexOf(boundaryValue);
            var bottomBoundaryStart = bufferStringified.lastIndexOf(boundaryValue);


            var bufferStringifiedWithoutTopBoundary = bufferStringified.slice(topBoundaryStart + boundaryValue.length);

            var bufferStringTopNewLinesPosition = bufferStringifiedWithoutTopBoundary.search(/(\r\n){2}/);
            // console.log('bufferStringTopNewLinesPosition', bufferStringTopNewLinesPosition)
            // console.log('bufferStringifiedWithoutTopBoundary', bufferStringifiedWithoutTopBoundary)
            var bufferStringifiedWithBottomBoundary = bufferStringifiedWithoutTopBoundary.slice(bufferStringTopNewLinesPosition + 4);

            // console.log('bufferStringifiedWithBottomBoundary', bufferStringifiedWithBottomBoundary)
            // remove bottom boundary
            var bufferStringBottomBoundaryPosition = bufferStringifiedWithBottomBoundary.lastIndexOf(boundaryValue);


            var bufferStringifiedComplete = bufferStringifiedWithBottomBoundary.slice(0, bufferStringBottomBoundaryPosition - 4);
            // -2 due to two additional dashes + \r\n = 4 positions
            // console.log('bufferStringifiedComplete', bufferStringifiedComplete)

            var contentDispositionHeaderStart = bufferStringified.search('Content-Disposition');
            var contentTypeStart = bufferStringified.search('Content-Type');
            if (contentDispositionHeaderStart !== -1 && contentTypeStart !== -1) {
                var slicedContentDisposition = bufferStringified.slice(contentDispositionHeaderStart, contentTypeStart);
                var fileNameStart = slicedContentDisposition.search('filename');
                
                var slicedFilename = slicedContentDisposition.slice(fileNameStart);
                // console.log('slicedFilename', slicedFilename);
                var fileNameWithExtention = slicedFilename.slice(slicedFilename.indexOf('"') + 1, slicedFilename.lastIndexOf('"'));
                console.log('fileNameWithExtention', fileNameWithExtention)

                var fileName = fileNameWithExtention.slice(0, fileNameWithExtention.lastIndexOf('.'));
                var extention = fileNameWithExtention.slice(fileNameWithExtention.lastIndexOf('.') + 1);
                console.log('fileName', fileName);
                console.log('extention', extention)
            }

            // check extensions

            var flag = fs.existsSync(constants.path.toUploadedImages  + fileNameWithExtention);
            // console.log('bufferStringified', bufferStringified);
            // console.log('buffer', buffer)
            if (!flag) {
                var stream = fs.createWriteStream(constants.path.toUploadedImages + fileNameWithExtention);
                stream.write(bufferStringifiedComplete);//buffer
                stream.end();
                // req.pipe(process.stdout);
            }



            // console.log('buffer', buffer)
        });

        

        // res.end(body);

        // req.pipe(res);


        
        res.write('done');
        res.end();
    }
        
    // }
    // form(req, res, pathName, queryObject);

};








        // var optionsForForm = {
        //     autoFiles: true,
        //     uploadDir: constants.path.toUploadedImages
        // }

        // var form = new multiparty.Form(optionsForForm);
 
        // form.parse(req, function(err, fields, files) {
        //   res.writeHead(200, {'content-type': 'text/plain'});
        //   res.write('received upload:\n\n');
        //   res.end(util.inspect({fields: fields, files: files}));
        // });