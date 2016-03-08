const appRoot = require('app-root-path').resolve('/');
const fs = require('fs');
const helpers = require(appRoot + 'server/helpers');
const constants = require(appRoot + 'server/constants');
var multiparty = require('multiparty');

module.exports = function (req, res, pathName, queryObject) {

    if (req.method.toLowerCase() == 'get') {
        var headerTemplate = fs.readFileSync(constants.path.toTemplates + 'common/header.html');
        var formTemplate = fs.readFileSync(constants.path.toTemplates + 'components/form/form.html');
        res.writeHead(constants.STATUS.OK, {
            'content-type': constants.HTTPHeaderValue.contentType.html + constants.HTTPHeaderValue.contentType.charsetUTF8
        });
        var footerTemplate = fs.readFileSync(constants.path.toTemplates + 'common/footer.html');
        res.write(headerTemplate);
        res.write(formTemplate);
        res.write(footerTemplate)
        res.end();
    }

    if ( req.method.toLowerCase() == 'post' ) {
        // replace  the following part with the commented part below
        //**
        var form = new multiparty.Form();
 
        form.parse(req, function(err, fields, files) {

            if (!files.image[0].size) {
                res.end(contants.message.error.emptyFile);
            };

            var fileFullName = files.image[0].originalFilename;
            var fileExtension = fileFullName.slice(fileFullName.lastIndexOf('.') + 1);

            if (!(helpers.getContentTypeHeaderForFileByExtension(fileExtension))) {
                return res.end(constants.message.error.inproperImage);
            }

            var pathToTemporarySavedImage = files.image[0].path;

            var fileAlreadyExists = fs.existsSync(constants.path.toUploadedImages  + fileFullName);

            if (fileAlreadyExists) {
                return res.end(constants.message.error.fileAlreadyExists);
            }

            var readStream = fs.createReadStream(pathToTemporarySavedImage);
            var writeStream = fs.createWriteStream(constants.path.toUploadedImages + fileFullName)
            readStream.pipe(writeStream);

            res.writeHead(constants.STATUS.OK, {
                'content-type': constants.HTTPHeaderValue.contentType.json + constants.HTTPHeaderValue.contentType.charsetUTF8
            });
            res.end(fileFullName + ' file is sucessfully saved!');
        });
        //**
    }

};

// my attempt to deal withoul multiparty alike modules. works only for text files

// // parse boundary from header Content-Type
// var contentTypeHeaderValue = req.headers['content-type'];
// var boundaryPosition = contentTypeHeaderValue.search('boundary=');
// var boundaryValue = contentTypeHeaderValue.slice(boundaryPosition + 9);
// console.log('boundaryValue', boundaryValue)


// var body = [];
// req.on('data', function(chunk) {
//     // console.log('chunk', chunk)
//     body.push(chunk);
// });
// req.on('end', function() {
//     var buffer = Buffer.concat(body);
//     var bufferStringified = buffer.toString();

//     // remove boundaries
//     // remove top boundary
//     var topBoundaryStart = bufferStringified.indexOf(boundaryValue);
//     var bottomBoundaryStart = bufferStringified.lastIndexOf(boundaryValue);


//     var bufferStringifiedWithoutTopBoundary = bufferStringified.slice(topBoundaryStart + boundaryValue.length);

//     var bufferStringTopNewLinesPosition = bufferStringifiedWithoutTopBoundary.search(/(\r\n){2}/);
//     // console.log('bufferStringTopNewLinesPosition', bufferStringTopNewLinesPosition)
//     // console.log('bufferStringifiedWithoutTopBoundary', bufferStringifiedWithoutTopBoundary)
//     var bufferStringifiedWithBottomBoundary = bufferStringifiedWithoutTopBoundary.slice(bufferStringTopNewLinesPosition + 4);

//     // console.log('bufferStringifiedWithBottomBoundary', bufferStringifiedWithBottomBoundary)
//     // remove bottom boundary
//     var bufferStringBottomBoundaryPosition = bufferStringifiedWithBottomBoundary.lastIndexOf(boundaryValue);


//     var bufferStringifiedComplete = bufferStringifiedWithBottomBoundary.slice(0, bufferStringBottomBoundaryPosition - 4);
//     // -2 due to two additional dashes + \r\n = 4 positions
//     // console.log('bufferStringifiedComplete', bufferStringifiedComplete)

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

//     var flag = fs.existsSync(constants.path.toUploadedImages  + fileNameWithExtention);
//     // console.log('bufferStringified', bufferStringified);
//     // console.log('buffer', buffer)
//     if (!flag) {
//         var stream = fs.createWriteStream(constants.path.toUploadedImages + fileNameWithExtention);
//         stream.write(bufferStringifiedComplete);//buffer
//         stream.end();
//         // req.pipe(process.stdout);
//     }
//     // console.log('buffer', buffer)
// });

// // res.end(body);

// // req.pipe(res);

// res.write('done');
// res.end();

