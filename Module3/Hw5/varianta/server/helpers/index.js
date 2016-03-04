var appRoot = require('app-root-path').resolve('/');
var fs = require('fs');
module.exports = {
    // writeResponseAndEnd: writeResponseAndEnd
    getFileByPath: getFileByPath
}

// function writeResponseAndEnd(result){
//     res.write(result);
//     res.end();
// };

function getFileByPath(path){
    console.log('appRoot + path', appRoot + path)
    fs.readFileSync(appRoot + path, function(err, data){
        if (err) throw err;
       
        console.log('data', data);
        return data;
        // return JSON.stringify(data);
    });
}