'use strict';

const express = require('express');
const router = express.Router();

const postService = require('./post.service.js');

router.route('')
    .get(postService.getAllPosts)
    .post(postService.postPost);

router.route('/subscribe')
    .get(postService.subscribe);

router.route('/:postId')
    .put(postService.updatePost);

module.exports = router;
