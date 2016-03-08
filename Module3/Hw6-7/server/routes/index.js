var login = require('./login');

module.exports = function (app) {

    // login / logout / signup routes
    login(app);

    // error handlers
    //errors(app);
};