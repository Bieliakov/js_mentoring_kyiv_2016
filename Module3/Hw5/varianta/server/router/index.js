
// var wishlist = require('./wishlist.js');

var Router = function (req, res, pathName, queryObject) {
    var args = Array.prototype.slice.call(arguments);
    console.log('args', args.length)

    route('/', require('./root.js'))
    route('/post', require('./form.js'));
    // form(req, res, pathName, queryObject);

    // wishlist(req, res, pathName, queryObject);
    // error handlers
    // errors(app);

    function route(route, callback){
        if (route === pathName) {
            callback.apply(null, args)
        }
    }
}


module.exports = Router;




    

    // } else  else if (pathname.search(/\/image/) != '-1' ) {

    //     if ( req.method == 'POST' ) {
            
    //         // var form = new formidable.IncomingForm();
    //         // form.encoding = 'utf-8';
    //         // // form.uploadDir = "";
    //         // form.parse(req, function(err, fields, files) {
    //         //   res.writeHead(200, {'content-type': 'text/plain;charset=utf-8;'});
    //         //   res.write('received upload:\n\n');
    //         //   res.end(util.inspect({fields: fields, files: files}));
    //         // });

    //         // form.on('end', function(fields, files) {
    //         //     /* Temporary location of our uploaded file */
    //         //     var temp_path = this.openedFiles[0].path;
    //         //     /* The file name of the uploaded file */
    //         //     var file_name = this.openedFiles[0].name;

    //         //     /* Location where we want to copy the uploaded file */
    //         //     var new_location = appRoot + neededFolderPath;

    //         //     console.log('temp_path',temp_path);
    //         //     console.log('file_name', file_name);
    //         //     console.log('new_location',new_location)
         
    //         //     fs.copy(temp_path, new_location + file_name, function(err) {  
    //         //         if (err) {
    //         //             console.error(err);
    //         //         } else {
    //         //             console.log("success!")
    //         //         }
    //         //     });
    //         // });
    //         // writeResponseAndEnd('post');
    //     }


        
    // }


