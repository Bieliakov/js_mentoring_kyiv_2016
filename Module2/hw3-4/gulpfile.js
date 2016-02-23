var gulp = require('gulp');                 //  main gulp module
var webpack = require('webpack');

var util = require('gulp-util');            //  Helps to write some logs out

gulp.task('dev', function(callback) {
    var WebpackDevServer = require("webpack-dev-server");
    var webpackDevConfig = require("./webpack.config.dev.js");

    var compiler = webpack(webpackDevConfig);

    // Start a webpack-dev-server
    new WebpackDevServer(compiler, {
        publicPath: "/src_client/"
        //contentBase: '/'

    }).listen(8080, "localhost", function(err) {
        if(err) throw new util.PluginError("dev", err);
        // Server listening
        util.log("[dev]", "http://localhost:8080/index.html");

        // keep the server alive or continue?
        // callback();
    });
});

gulp.task("default", ["dev"]);
