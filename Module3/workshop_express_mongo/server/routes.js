'use strict';

var path = require('path');

module.exports = function(app) {
    app.use('/api', require('./api'))
}
