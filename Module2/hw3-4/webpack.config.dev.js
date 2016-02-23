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
        library: "[name]",
        chunkFilename: "[id].bundle.js"
    },

    watch: true,

    watchOptions: {
        aggregateTimeout: 100
    },

    devtool: "cheap-module-inline-source-map",

    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: [path.resolve(__dirname, "node_modules")],
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
