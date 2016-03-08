'use strict';

var express = require('express');
var config = require('./config');
var mongoose = require('mongoose');

mongoose.Promise = require('q').Promise;

var routes = require('./routes');
var middleware = require('./middleware');

//mongoose.set('debug', true);
mongoose.connect(config.mongoURL, function (err) {
	if (err) throw err;

	console.log('connected to MongoDB');

	var app = express();
	middleware(app);
	routes(app);

	app.listen(config.port, function (err) {
		if (err) {
			console.error(err);
		} else {
			console.log('now listening on http://localhost:' + config.port);
		}
	});

});

// add mongoose query and promise support to express
// require('express-mongoose');

