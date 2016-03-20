'use strict';

const express = require('express');
const router = express.Router();
const appRoot = require('app-root-path').resolve('/');
const constants = require(appRoot + 'server/constants');
const fs = require('fs');
const helpers = require(appRoot + 'server/helpers');
const Post = require(constants.path.toModels + 'post.js');
const url = require('url');
const multiparty = require('multiparty');

router.post('/update', (req, res) => {
    // username is taken from session
    let username = req.user.username;

    var form = new multiparty.Form();
 
    form.parse(req, function(err, fields, files) {
        if (err) throw err;
        console.log('files', files);
        if (!files.image[0].size) {
            res.send({error: contants.message.error.emptyFile});
        }

        var fileFullName = files.image[0].originalFilename;
        var fileExtension = fileFullName.slice(fileFullName.lastIndexOf('.') + 1);

        if (!(helpers.getContentTypeHeaderForFileByExtension(fileExtension))) {
            return res.send({error: constants.message.error.inproperImage});
        }

        var pathToTemporarySavedImage = files.image[0].path;

        var fileAlreadyExists = fs.existsSync(constants.path.toUploadedImages  + fileFullName);

        if (fileAlreadyExists) {
            return res.send({error: constants.message.error.fileAlreadyExists});
        }

        var readStream = fs.createReadStream(pathToTemporarySavedImage);
        var writeStream = fs.createWriteStream(constants.path.toUploadedImages + fileFullName)
        readStream.pipe(writeStream);
        res.json({message: fileFullName + ' file is sucessfully saved!'});
    });
});

router.get('/:name/post', (req, res) => {
    var url_parts = url.parse(req.url, true);
    var queryObject = url_parts.query;

    let response = {};
    let query = {};

    query.author = req.params.name;

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
        // query.author = req.user.username;
    }

    Post.count(query, function(err, number) {
        response.count = number;
        Post.find(query, {}, options, (err, docs) => {
            response.posts = docs;
            res.send(response);
        });
    });
});

module.exports = router;