const appRoot = require('app-root-path').resolve('/');
const fs = require('fs');
const helpers = require(appRoot + 'server/helpers');
const constants = require(appRoot + 'server/constants');
const pathToTemplates = appRoot + 'server/templates/components/';

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
        
        // console.log('req', Object.keys(req))
        // console.log('rawTrailers',req.rawTrailers)
        console.log('req.getHeader', req.getHeader)
        // console.log('req.headers', Object.keys(req.headers))
        // console.log('constants.path.toUploadedImages test', constants.path.toUploadedImages + 'test')

        // var body = [];
        // req.on('data', function(chunk) {

        //     body.push(chunk);
        // });
        // req.on('end', function() {
        //     var buffer = Buffer.concat(body);
        //     var bufferStringified = buffer.toString();
        //     var contentDispositionHeaderStart = bufferStringified.search('Content-Disposition');
        //     var contentTypeStart = bufferStringified.search('Content-Type');
        //     if (contentDispositionHeaderStart !== -1 && contentTypeStart !== -1) {
        //         var slicedContentDisposition = bufferStringified.slice(contentDispositionHeaderStart, contentTypeStart);
        //         var fileNameStart = slicedContentDisposition.search('filename');
                
        //         var slicedFilename = slicedContentDisposition.slice(fileNameStart);
        //         // console.log('slicedFilename', slicedFilename);
        //         var fileNameWithExtention = slicedFilename.slice(slicedFilename.indexOf('"') + 1, slicedFilename.lastIndexOf('"'));
        //         console.log('fileNameWithExtention', fileNameWithExtention)

        //         var fileName = fileNameWithExtention.slice(0, fileNameWithExtention.lastIndexOf('.'));
        //         var extention = fileNameWithExtention.slice(fileNameWithExtention.lastIndexOf('.') + 1);
        //         console.log('fileName', fileName);
        //         console.log('extention', extention)
        //     }

        //     // check extensions





        //     // console.log('buffer', buffer)
        // });

        // var flag = fs.existsSync(constants.path.toUploadedImages  + 'fileNameWithExtention1');

        // if (!flag) {
            var stream = fs.createWriteStream(constants.path.toUploadedImages + 'fileNameWithExtention1.txt');
        //     // stream.write(buffer);
            req.pipe(stream);
        // }

        // res.end(body);

        // req.pipe(res);
        res.write('done');
        res.end();
    }
        
    // }
    // form(req, res, pathName, queryObject);

};





