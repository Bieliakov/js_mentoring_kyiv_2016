var gulp = require('gulp');                 //  main gulp module
var webpack = require('webpack');
var webpackDevServerConfig = require('./webpack-dev-server.config.js');

var util = require('gulp-util');            //  Helps to write some logs out

gulp.task('dev', webpackDevServerConfig);

gulp.task("default", ["dev"]);
