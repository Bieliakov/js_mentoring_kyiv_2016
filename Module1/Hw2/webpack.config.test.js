'use strict';

var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: {
        index: './framer/test/index.spec.js'
    },
    output: {
        path: path.resolve(__dirname, 'framer', 'test'),
        filename: 'test.bundle.js'
    },

    module: {
        preLoaders: [
            {
                test: /\.js$/,
                loaders: ['eslint'],
                exclude: [path.resolve(__dirname, "node_modules")]
            }
        ],
        loaders: [
            {
                test: /\.js$/,
                exclude: path.resolve(__dirname, "node_modules"),
                loader: 'babel-loader?presets[]=es2015'
            }
            ,{
                test: /\.scss/,
                loader: 'style!css!autoprefixer?browsers=last 2 version!sass!'
            }
            ,{
                test: /\.html$/,
                loader: 'raw'
            }
        ]
    }
};