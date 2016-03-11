const webpack = require('webpack');
const util = require('gulp-util');  
const configEnv = require('./config.env.js');
const port = configEnv.port;

module.exports = function(callback) {
    const WebpackDevServer = require('webpack-dev-server');
    const webpackDevConfig = require("./webpack.config.dev.js");

    var compiler = webpack(webpackDevConfig);

    // Start a webpack-dev-server
    new WebpackDevServer(compiler, {
        publicPath: "/src_client/",
        hot: true,
        proxy: {
            "api/": "http://localhost:" + configEnv.serverPort
        },
        //contentBase: '/'

    }).listen(port, "localhost", function(err) {
        if(err) throw new util.PluginError("dev", err);
        // Server listening
        util.log('[dev]', 'http://localhost:' + port + '/index.html');

        // keep the server alive or continue?
        // callback();
    });
}
