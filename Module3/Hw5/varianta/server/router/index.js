var form = require('./form.js');
var wishlist = require('./wishlist.js');

module.exports = function (app) {

    login(app);

    wishlist(app);
    // error handlers
    // errors(app);
};