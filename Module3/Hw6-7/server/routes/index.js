'use strict';

module.exports = function(app) {
    app.use('/api', require('./api'));
    app.get('', function(req, res){
        res.status(200);
        res.send('hello root');
    })
};
