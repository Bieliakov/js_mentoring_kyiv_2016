'use strict';

var express = require('express');
var router = express.Router();
const constants = require(appRoot + 'server/constants');
const Post = require(constants.path.toModels + 'post.js');

router.get('/:name/post', (req, res) => {
    let response = {};
    let query = {};
    if (req.user) {
        response.username = req.user.username;
        query.author = req.params.name;
        // console.log('query', query)
    };

    Post.count(query, function(err, number) {
        response.count = number;

        Post.find(query, (err, docs) => {
            response.posts = docs;
            res.send(response);
        });
        
    });

    
});

module.exports = router;