'use strict';

const appRoot = require('app-root-path').resolve('/');
const constants = require(appRoot + 'server/constants');
const Post = require(constants.path.toModels + 'post.js');
const ObjectID = require("bson-objectid");
const express = require('express');
const router = express.Router();
const url = require('url');
var EventEmitter = require('events').EventEmitter;
var pubsub = new EventEmitter();
pubsub.setMaxListeners(100)

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
            created: -1 // ASC
        },
        skip: (queryObject.page - 1) * queryObject.countpage,
        limit: parseInt(queryObject.countpage)
    };
    console.log('req.user', req.user)
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

router.get('/subscribe', (req, res) => {
    pubsub.once('POST ADDITION', handlePostAddition);
    pubsub.once('COMMENT ADDITION', handleCommentAddition);

    function handlePostAddition(newPost) {
        res.send(newPost)
    }
    
    function handleCommentAddition(newComment) {
        res.send(newComment)
    }

    // req.on('close', function(){
    //     console.log('closed')
    //     console.log('pubsub.listenerCount before', pubsub.listenerCount())
    //     pubsub.removeListener('POST ADDITION', handler);
    //     console.log('pubsub.listenerCount after', pubsub.listenerCount())
    // });
});

// router.get('/publish', (req, res) => {
//     chat.subscribe(req, res);
   
// });

router.post('', (req, res) => {
    let post = req.body;
    post.author = req.user.username;
    post.author_avatar = req.user.avatar_url;

    Post.create(post, (err, post) => {
        if (err) return next(err);

        pubsub.emit('POST ADDITION', post);

        // res.send(post);
    });

});

router.put('/:postId', (req, res) => {

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
            pubsub.emit('COMMENT ADDITION', comment);
            // res.send(updatedPost);
        });
    } else if (req.body.action === 'deleteComment') {
        let paramsForUpdate = {
            $pull: { comments: {_id: ObjectID(req.body.commentId)}},
            $inc: { commentCount: -1 }
        };
        // ObjectID wrapper is needed because in the db comment ids are saved in bson format instead of strings
        Post.findByIdAndUpdate(req.params.postId, paramsForUpdate,(err, updatedPost) => {
            if (err) console.log(err);
            pubsub.emit('COMMENT ADDITION', comment);
            // res.send(updatedPost);
        });   
    } 
});

module.exports = router;