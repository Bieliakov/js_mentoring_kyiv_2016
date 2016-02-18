var gulp = require('gulp');                 //  main gulp module
var webpack = require('webpack');
var webpackDevServerConfig = require('./webpack-dev-server.config.js');

var util = require('gulp-util');            //  Helps to write some logs out

gulp.task('dev', webpackDevServerConfig);

gulp.task('test', function(callback) {
    var resolve = require('path').resolve;
    var webpackTestConfig = require('./webpack.config.test.js');
    var karma = require('karma');
    var Server = karma.Server;

    var compiler = webpack(webpackTestConfig);
    compiler.run(function(err, stats) {
        if (err) {
            gutil.log('webpack', err);
            return;
        }
        Server.start({
            configFile: resolve(__dirname, 'karma.conf.js')
        }, function(exitCode) {
            util.log('Karma has exited with exitCode ' + exitCode);
            process.exit(exitCode);
        });
    });

});

gulp.task("default", ["dev"]);
