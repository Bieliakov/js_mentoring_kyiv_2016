var appRoot = require('app-root-path').resolve('/');

var helpers = require(appRoot + 'server/helpers');


// var headerTemplate = require(appRoot + 'server/templates/common/header.html');
// var mainTemplate = require(appRoot + 'server/templates/components/form/form.html');
// var footerTemplate = require(appRoot + 'server/templates/common/footer.html');

module.exports = function (req, res, pathName, queryObject) {

    // if (pathname.search(/\/post\/?$/) != '-1'){
    if (req.method == 'GET') {

        res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8;' });

        var header = helpers.getFileByPath('server/templates/common/header.html');
        // var result = headerTemplate + mainTemplate + footerTemplate;

        writeResponseAndEnd(header);
    }



    if ( req.method == 'POST' ) {
        writeResponseAndEnd('post');
    }
        
    // }
    // form(req, res, pathName, queryObject);
    function writeResponseAndEnd(result){
        console.log('result', result)
        res.write(result);
        res.end();
    };
};





