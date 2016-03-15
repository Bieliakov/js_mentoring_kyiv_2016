'use strict';

const mongoose = require('mongoose');
const appRoot = require('app-root-path').resolve('/');
const constants = require(appRoot + 'server/constants');
const Post = require(constants.path.toModels + 'post.js');
const ObjectID = require("bson-objectid");
var express = require('express');
var router = express.Router();
var url = require('url');
// function loggedIn(req, res, next) {
//     if (req.user) {
//         next();
//     } else {
//         res.redirect('/login');
//     }
// }

router.get('', (req, res) => {
    require(constants.path.toSharedRoutes).posts(req,res);
});

router.post('', (req, res) => {
    let post = req.body;
    post.author = req.user.username;
    
    Post.create(post, (err, post) => {
       if (err) return next(err);
       // res.redirect('#wall');
        res.send(post.title + ' post is added!');
    });

});

router.put('/:postId', (req, res) => {

    console.log('req.body.commentId',req.body.commentId)
    // let response = {};
    // let query = {};
    // if (req.user) {
    //     response.username = req.user.username;
    //     query.author = req.params.name;
    //     // console.log('query', query)
    // };

    if (req.body.action === 'addComment') {
        let comment = {
            _id: ObjectID(),
            author: req.user.username,
            text: req.body.text,
            post: req.params.postId
        }
        console.log('comment in put ', comment)
        Post.findByIdAndUpdate(req.params.postId, { $addToSet: { comments: comment }},(err, updatedPost) => {
            if (err) console.log(err);
            res.send(updatedPost);
        });
    } else if (req.body.action === 'deleteComment') {
        // ObjectID wrapper is needed because in the db commen ids are saved in bson format instead of strings
        Post.findByIdAndUpdate(req.params.postId, { $pull: { comments: {_id: ObjectID(req.body.commentId)} }},(err, updatedPost) => {
            if (err) console.log(err);
            res.send(updatedPost);
        });   
    } 
});

// router.get('/:postId/comment', (req, res) => {
//     let response = {};
//     let query = {};
//     if (req.user) {
//         response.username = req.user.username;
//         query.author = req.params.name;
//         // console.log('query', query)
//     };
//     Post.find(query, (err, docs) => {
//         response.posts = docs;
//         res.send(response);
//     });
// });

//   // comments
// router.post("/:postId/comment", loggedIn, function (req, res, next) {
// var id = req.param('id');
// var text = req.param('text');
// var author = req.session.user;

// Comment.create({
//     post: id
//   , text: text
//   , author: author
//  }, function (err, comment) {
//   if (err) return next(err);

//   // TODO probably want to do this all with with xhr
//   res.redirect("/post/" + id);
// });
// });

module.exports = router;