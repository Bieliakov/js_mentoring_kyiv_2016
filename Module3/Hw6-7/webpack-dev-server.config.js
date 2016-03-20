const webpack = require('webpack');
const util = require('gulp-util');  
const configEnv = require('./config.env.js');
const port = configEnv.port;
module.exports = function(callback) {
    const WebpackDevServer = require('webpack-dev-server');
    const webpackDevConfig = require("./webpack.config.dev.js");

    var compiler = webpack(webpackDevConfig);

    new WebpackDevServer(compiler, {
        publicPath: '/src_client/',
        hot: true,
        proxy: {
            '/api/*': 'http://localhost:' + configEnv.serverPort
        }
    }).listen(port, "localhost", function(err) {
        if(err) throw new util.PluginError("dev", err);
        util.log('[dev]', 'http://localhost:' + port + '/index.html');
    });
};
