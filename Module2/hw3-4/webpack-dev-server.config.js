var webpack = require('webpack');
var util = require('gulp-util');  
var configEnv = require('./config.env.js');
var port = configEnv.port;

module.exports = function(callback) {
    var WebpackDevServer = require('webpack-dev-server');
    var webpackDevConfig = require('./webpack.config.dev.js');

    var compiler = webpack(webpackDevConfig);

    // Start a webpack-dev-server
    new WebpackDevServer(compiler, {
        publicPath: '/src_client/',
        hot: true
        //contentBase: '/'

    }).listen(8080, "localhost", function(err) {
        if(err) throw new util.PluginError("dev", err);
        // Server listening
        util.log('[dev]', 'http://localhost:' + port + '/index.html');

        // keep the server alive or continue?
        // callback();
    });
}
