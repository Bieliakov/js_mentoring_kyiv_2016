'use strict';

// var path = require('path');

module.exports = function(app) {
    app.use('/api', require('./api'))
}

// var login = require('./login');

// module.exports = function (app) {

//     // login / logout / signup routes
//     login(app);

//     // error handlers
//     //errors(app);
// };