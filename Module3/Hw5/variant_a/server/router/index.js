
var Router = function (req, res, pathName, queryObject) {
    var args = Array.prototype.slice.call(arguments);

    route('/', require('./root.js'));
    route('/post', require('./form.js'));
    route('/image', require('./image.js'));

    function route(route, callback){
        if (route === pathName) {
            callback.apply(null, args)
        }
    }
};

module.exports = Router;