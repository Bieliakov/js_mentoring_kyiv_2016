'use strict';

const url = require('url');
const appRoot = require('app-root-path').resolve('/');
const constants = require(appRoot + 'server/constants');
const Post = require(constants.path.toModels + 'post.js');
const ObjectID = require("bson-objectid");
const EventEmitter = require('events').EventEmitter;
const pubsub = new EventEmitter();
pubsub.setMaxListeners(100);

module.exports = {
    getAllPosts: getAllPosts,
    postPost:postPost,
    subscribe: subscribe,
    updatePost: updatePost
};

function getAllPosts(req, res) {
    
    let url_parts = url.parse(req.url, true);
    let queryObject = url_parts.query;

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
            created: -1 // ASC
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
}

function postPost(req, res) {
    if (!req.user) {
        res.status(403);
        return res.send({message: constants.message.error.unauthorized});
    }

    let post = req.body;
    post.author = req.user.username;
    post.author_avatar = req.user.avatar_url;

    Post.create(post, (err, addedPost) => {
        if (err) return next(err);

        pubsub.emit('POST ADDITION', addedPost);
    });
    res.send(post);
}

function subscribe(req, res) {
    pubsub.once('POST ADDITION', handlePostAddition);
    pubsub.once('COMMENT ADDITION', handleCommentAddition);

    function handlePostAddition(newPost) {
        res.send(newPost);
        // without this request is not closed
        req.emit('close');
    }
    
    function handleCommentAddition(newComment) {
        res.send(newComment)
        req.emit('close');
    }

    req.on('close', function() {
        pubsub.removeListener('POST ADDITION', handlePostAddition);
        pubsub.removeListener('COMMENT ADDITION', handleCommentAddition);
    });
}

function updatePost(req, res) {
    if (!req.user) {
        res.status(403);
        return res.send({message: constants.message.error.unauthorized});
    }

    if (req.body.action === 'addComment') {
        let comment = {
            _id: ObjectID(),
            author: req.user.username,
            text: req.body.text,
            post: req.params.postId,
            author_avatar: req.user.avatar_url
        };

        let paramsForUpdate = {
            $addToSet: { comments: comment },
            $inc: { commentCount: 1 }
        };

        Post.findByIdAndUpdate(req.params.postId, paramsForUpdate,(err, updatedPost) => {
            if (err) console.log(err);
            
            res.send(updatedPost);
        });

        pubsub.emit('COMMENT ADDITION', comment);

    } else if (req.body.action === 'deleteComment') {
        let paramsForUpdate = {
            $pull: { comments: {_id: ObjectID(req.body.commentId), author: req.user.username}},
            $inc: { commentCount: -1 }
        };
        // ObjectID wrapper is needed because in the db comment ids are saved in bson format instead of strings
        Post.findByIdAndUpdate(req.params.postId, paramsForUpdate,(err, updatedPost) => {
            if (err) console.log(err);

            res.send(updatedPost);
        });
    }
}