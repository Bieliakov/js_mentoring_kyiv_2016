var express = require('express');
var mongoose = require('mongoose');
mongoose.Promise = require('q').Promise;

var bodyParser = require('body-parser');

var routes = require('./routes.js');
var config = require('./config/express.js');
var constants = require('./constants.js');

var connectionString = 'mongodb://Admin:;bpym;bpym@ds023468.mlab.com:23468/my_express_workshop';

mongoose.connect(connectionString, {});

var app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

routes(app);

app.listen(constants.port, () => {
    console.log(`listening on port ${constants.port}`);
});
