'use strict';

var webpack = require('webpack');
var path = require('path');
var configEnv = require('./config.env.js');
var port = configEnv.port;

module.exports = {
    context: path.resolve(__dirname, 'js'),

    entry: {
        index: ['webpack-dev-server/client?http://localhost:' + port + '/', 'webpack/hot/dev-server', './index.js']
    },
    output: {
        path: path.resolve(__dirname, 'build', 'js'),
        filename: "[name].bundle.js",
        chunkFilename: "[id].bundle.js"
    },

    devtool: "cheap-module-inline-source-map",

    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: [path.resolve(__dirname, "node_modules"), /.spec.js$/],
                loader: 'babel-loader?presets[]=es2015'

            },
            {
                test: /\.jsx$/,
                loader: 'babel-loader',
                exclude: [path.resolve(__dirname, "node_modules")],
                query:
                    {
                        presets:['react', 'es2015']
                    }
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            }
        ]
    },
    plugins: [
        new webpack.NoErrorsPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.CommonsChunkPlugin('common.bundle.js'),
        new webpack.ProvidePlugin({
            React: "react",
            ReactDOM: 'react-dom'
        })
    ]
};
