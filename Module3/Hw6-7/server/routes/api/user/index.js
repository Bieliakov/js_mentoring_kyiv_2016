'use strict';

var express = require('express');
var router = express.Router();
const appRoot = require('app-root-path').resolve('/');
const constants = require(appRoot + 'server/constants');

router.get('/:name/post', (req, res) => {
    let additionalData = {
        currentUserName: req.params.name
    }
    require(constants.path.toSharedRoutes).posts(req,res, additionalData);
});

module.exports = router;