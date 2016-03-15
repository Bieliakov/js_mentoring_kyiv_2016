'use strict';

const appRoot = require('app-root-path').resolve('/');
const constants = require(appRoot + 'server/constants');
const Post = require(constants.path.toModels + 'post.js');
var url = require('url');

module.exports = {
    posts: posts
}

function posts(req, res, additionalData) {
    var url_parts = url.parse(req.url, true);
    var queryObject = url_parts.query;

    console.log('queryObject', queryObject)
    let response = {};
    let query = {};

    if (additionalData && additionalData.currentUserName) {
        query.author = additionalData.currentUserName;
    }

    if (!queryObject.page) {
        queryObject.page = 1;
    }
    if (!queryObject.countpage) {
        queryObject.countpage = 10;
    }

    let options = {
        skip: (queryObject.page - 1) * queryObject.countpage,
        limit: parseInt(queryObject.countpage),
    }

    if (req.user) {
        response.username = req.user.username;
        // query.author = req.user.username;
    };

    Post.count(query, function(err, number) {
        response.count = number;

        console.log('options', options)
        Post.find(query, {}, options, (err, docs) => {
            response.posts = docs;
            res.send(response);
        });
    });
}