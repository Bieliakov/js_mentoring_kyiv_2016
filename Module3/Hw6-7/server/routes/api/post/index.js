'use strict';

const appRoot = require('app-root-path').resolve('/');
const constants = require(appRoot + 'server/constants');
const Post = require(constants.path.toModels + 'post.js');
const ObjectID = require("bson-objectid");
const express = require('express');
const router = express.Router();
const url = require('url');

router.get('', (req, res) => {
    
    var url_parts = url.parse(req.url, true);
    var queryObject = url_parts.query;

    let response = {};
    let query = {};

    if (!queryObject.page) {
        queryObject.page = 1;
    }
    if (!queryObject.countpage) {
        queryObject.countpage = 10;
    }

    let options = {
        sort: {
            created: 1 // ASC
        },
        skip: (queryObject.page - 1) * queryObject.countpage,
        limit: parseInt(queryObject.countpage)
    };

	if (req.user) {
		response.username = req.user.username;
	}

    Post.count(query, function(err, number) {
        response.count = number;

        Post.find(query, {}, options, (err, docs) => {
            response.posts = docs;
            res.send(response);
        });
    });
});

router.post('', (req, res) => {
    let post = req.body;
    post.author = req.user.username;
    
    Post.create(post, (err, post) => {
        if (err) return next(err);
        res.send(post.title + ' post is added!');
    });

});

router.put('/:postId', (req, res) => {

    if (req.body.action === 'addComment') {
        let comment = {
            _id: ObjectID(),
            author: req.user.username,
            text: req.body.text,
            post: req.params.postId
        };

        let paramsForUpdate = {
            $addToSet: { comments: comment },
            $inc: { commentCount: 1 }
        };

        Post.findByIdAndUpdate(req.params.postId, paramsForUpdate,(err, updatedPost) => {
            if (err) console.log(err);
            res.send(updatedPost);
        });
    } else if (req.body.action === 'deleteComment') {
        let paramsForUpdate = {
            $pull: { comments: {_id: ObjectID(req.body.commentId)}},
            $inc: { commentCount: -1 }
        };
        // ObjectID wrapper is needed because in the db comment ids are saved in bson format instead of strings
        Post.findByIdAndUpdate(req.params.postId, paramsForUpdate,(err, updatedPost) => {
            if (err) console.log(err);
            res.send(updatedPost);
        });   
    } 
});

module.exports = router;