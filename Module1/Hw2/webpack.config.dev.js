'use strict';

var  webpack = require('webpack');
var path = require('path');

module.exports = {
    context: path.resolve(__dirname, 'src_client', 'app'),

    entry: {
        index: './index.js'
    },
    output: {
        path: path.resolve(__dirname, 'build', 'js'),
        filename: "[name].bundle.js",
        chunkFilename: "[id].bundle.js"
    },

    watch: true,

    watchOptions: {
        aggregateTimeout: 100
    },

    devtool: "cheap-module-inline-source-map",

    module: {

        preLoaders: [
            {
                test: /\.js$/,
                loaders: ['eslint'],
                exclude: [path.resolve(__dirname, "node_modules"), /.spec.js$/]
            }
        ],
        loaders: [
            {
                test: /\.js$/,
                exclude: [path.resolve(__dirname, "node_modules"), /.spec.js$/],
                loader: 'babel-loader?presets[]=es2015'
            }
            ,{
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.html$/,
                loader: 'raw'
            }
        ]
    },
    plugins: [
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.CommonsChunkPlugin('common.bundle.js')
    ]
};
