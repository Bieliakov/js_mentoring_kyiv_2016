'use strict';

var express = require('express');
var config = require('../config.env.js');
var socket_io = require('socket.io');
const http = require('http');
var mongoose = require('mongoose');

mongoose.Promise = require('q').Promise;

var routes = require('./routes');
var middleware = require('./middleware');

mongoose.connect(config.mongoURL, function (err) {
	if (err) throw err;

	console.log('connected to MongoDB');

	var app = express();
	var server = http.Server(app);

	var io = require('socket.io')(server);

	middleware(app);
	routes(app);

	app.listen(config.serverPort, function (err) {
		if (err) {
			console.error(err);
		} else {
			console.log('now listening on http://localhost:' + config.serverPort);
		}
	});

	io.on('connection', function (socket) {
	  console.log('client connect');
	  socket.on('post', function (data) {
	    console.log(data);
	    socket.broadcast.emit('post', data);
	  });
	});

});
